import { Container, getLogger, Logger, PaginationOptions } from "@deboxsoft/module-core";
import {
  InstructorFilter,
  Instructor,
  InstructorError,
  InstructorEvent,
  InstructorInput,
  InstructorService,
  InstructorUpdateInput,
  InstructorDataInput,
  InstructorCreateResponse,
  InstructorUpdateResponse,
  InstructorRemoveResponse,
  INSTRUCTOR_SERVICE_KEY
} from "@deboxsoft/lms-api";
import { MQEmitter } from "mqemitter";
import { getInstructorRepo, InstructorRepo } from "../db/index.js";
import { LmsPoltekServerModuleConfig } from "../types.js";

export const createInstructorServiceServer = async (opts: LmsPoltekServerModuleConfig) => {
  const InstructorRepo = getInstructorRepo();
  const InstructorService = new InstructorServiceServer(InstructorRepo, opts);
  Container.set(INSTRUCTOR_SERVICE_KEY, InstructorService);
  return InstructorService;
};

export class InstructorServiceServer implements InstructorService {
  logger: Logger;
  event: MQEmitter;
  constructor(private InstructorRepo: InstructorRepo, { event }: LmsPoltekServerModuleConfig) {
    this.logger = getLogger();
    this.event = event;
  }

  async create(input: InstructorInput): Promise<InstructorCreateResponse> {
    const dataInput: InstructorDataInput = InstructorInput.parse(input);
    this.event.emit({ topic: InstructorEvent.onBeforeCreate, input: dataInput });
    const { data: id } = await this.InstructorRepo.create(dataInput);
    if (id) {
      this.InstructorRepo.findById(id).then((_) => {
        if (_) {
          this.event.emit({ topic: InstructorEvent.onAfterCreate, data: _ });
          return _;
        } else {
        }
      });
      return {
        data: id,
        meta: {}
      };
    }
    throw new InstructorError({ code: "INSTRUCTOR_CREATE_FAILED" });
  }

  async update(id, input: InstructorUpdateInput): Promise<InstructorUpdateResponse> {
    const dataInput: Partial<InstructorDataInput> = InstructorUpdateInput.parse(input);
    this.event.emit({ topic: InstructorEvent.onBeforeUpdate, id, input: dataInput });
    const { data } = await this.InstructorRepo.update(id, dataInput);
    if (data) {
      this.findById(id).then((_) => {
        if (_) {
          this.event.emit({ topic: InstructorEvent.onAfterUpdate, data: _ });
        }
      });
      return {
        data,
        meta: {}
      };
    }
    throw new InstructorError({ code: "INSTRUCTOR_UPDATE_FAILED", args: { id } });
  }

  async remove(id: string): Promise<InstructorRemoveResponse> {
    this.event.emit({ topic: InstructorEvent.onBeforeRemove, id });
    const { data } = await this.InstructorRepo.remove(id);
    if (data) {
      this.event.emit({ topic: InstructorEvent.onAfterRemove, id });
      return {
        data,
        meta: {}
      };
    }
    throw new InstructorError({ code: "INSTRUCTOR_REMOVE_FAILED", args: { id } });
  }

  async findById(id: string): Promise<Instructor | undefined> {
    return await this.InstructorRepo.findById(id);
  }

  async find(filter?: InstructorFilter): Promise<Instructor[]> {
    return await this.InstructorRepo.find(filter);
  }

  findPage(opts: PaginationOptions<InstructorFilter>) {
    return this.InstructorRepo.findPage(opts);
  }
}
