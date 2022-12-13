import { Container, getLogger, Logger, PaginationOptions } from "@deboxsoft/module-core";
import {
  EnrollmentFilter,
  Enrollment,
  EnrollmentError,
  EnrollmentEvent,
  EnrollmentInput,
  EnrollmentService,
  EnrollmentUpdateInput,
  EnrollmentDataInput,
  EnrollmentCreateResponse,
  EnrollmentUpdateResponse,
  EnrollmentRemoveResponse,
  ENROLLMENT_SERVICE_KEY
} from "@deboxsoft/lms-api";
import { MQEmitter } from "mqemitter";
import { getEnrollmentRepo, EnrollmentRepo } from "../db/index.js";
import { LmsPoltekServerModuleConfig } from "../types.js";

export const createEnrollmentServiceServer = async (opts: LmsPoltekServerModuleConfig) => {
  const EnrollmentRepo = getEnrollmentRepo();
  const EnrollmentService = new EnrollmentServiceServer(EnrollmentRepo, opts);
  Container.set(ENROLLMENT_SERVICE_KEY, EnrollmentService);
  return EnrollmentService;
};

export class EnrollmentServiceServer implements EnrollmentService {
  logger: Logger;
  event: MQEmitter;
  constructor(private EnrollmentRepo: EnrollmentRepo, { event }: LmsPoltekServerModuleConfig) {
    this.logger = getLogger();
    this.event = event;
  }

  async create(input: EnrollmentInput): Promise<EnrollmentCreateResponse> {
    const dataInput: EnrollmentDataInput = EnrollmentInput.parse(input);
    this.event.emit({ topic: EnrollmentEvent.onBeforeCreate, input: dataInput });
    const { data: id } = await this.EnrollmentRepo.create(dataInput);
    if (id) {
      this.EnrollmentRepo.findById(id).then((_) => {
        if (_) {
          this.event.emit({ topic: EnrollmentEvent.onAfterCreate, data: _ });
          return _;
        } else {
        }
      });
      return {
        data: id,
        meta: {}
      };
    }
    throw new EnrollmentError({ code: "ENROLLMENT_CREATE_FAILED" });
  }

  async update(id, input: EnrollmentUpdateInput): Promise<EnrollmentUpdateResponse> {
    const dataInput: Partial<EnrollmentDataInput> = EnrollmentUpdateInput.parse(input);
    this.event.emit({ topic: EnrollmentEvent.onBeforeUpdate, id, input: dataInput });
    const { data } = await this.EnrollmentRepo.update(id, dataInput);
    if (data) {
      this.findById(id).then((_) => {
        if (_) {
          this.event.emit({ topic: EnrollmentEvent.onAfterUpdate, data: _ });
        }
      });
      return {
        data,
        meta: {}
      };
    }
    throw new EnrollmentError({ code: "ENROLLMENT_UPDATE_FAILED", args: { id } });
  }

  async remove(id: string): Promise<EnrollmentRemoveResponse> {
    this.event.emit({ topic: EnrollmentEvent.onBeforeRemove, id });
    const { data } = await this.EnrollmentRepo.remove(id);
    if (data) {
      this.event.emit({ topic: EnrollmentEvent.onAfterRemove, id });
      return {
        data,
        meta: {}
      };
    }
    throw new EnrollmentError({ code: "ENROLLMENT_REMOVE_FAILED", args: { id } });
  }

  async findById(id: string): Promise<Enrollment | undefined> {
    return await this.EnrollmentRepo.findById(id);
  }

  async find(filter?: EnrollmentFilter): Promise<Enrollment[]> {
    return await this.EnrollmentRepo.find(filter);
  }

  findPage(opts: PaginationOptions<EnrollmentFilter>) {
    return this.EnrollmentRepo.findPage(opts);
  }
}
