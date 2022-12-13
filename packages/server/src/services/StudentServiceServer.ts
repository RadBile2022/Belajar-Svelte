import { Container, getLogger, Logger, PaginationOptions } from "@deboxsoft/module-core";
import {
  StudentFilter,
  Student,
  StudentError,
  StudentEvent,
  StudentInput,
  StudentService,
  StudentUpdateInput,
  StudentDataInput,
  StudentCreateResponse,
  StudentUpdateResponse,
  StudentRemoveResponse,
  STUDENT_SERVICE_KEY
} from "@deboxsoft/lms-api";
import { MQEmitter } from "mqemitter";
import { getStudentRepo, StudentRepo } from "../db/index.js";
import { LmsPoltekServerModuleConfig } from "../types.js";

export const createStudentServiceServer = async (opts: LmsPoltekServerModuleConfig) => {
  const StudentRepo = getStudentRepo();
  const StudentService = new StudentServiceServer(StudentRepo, opts);
  Container.set(STUDENT_SERVICE_KEY, StudentService);
  return StudentService;
};

export class StudentServiceServer implements StudentService {
  logger: Logger;
  event: MQEmitter;
  constructor(private StudentRepo: StudentRepo, { event }: LmsPoltekServerModuleConfig) {
    this.logger = getLogger();
    this.event = event;
  }

  async create(input: StudentInput): Promise<StudentCreateResponse> {
    const dataInput: StudentDataInput = StudentInput.parse(input);
    this.event.emit({ topic: StudentEvent.onBeforeCreate, input: dataInput });
    const { data: id } = await this.StudentRepo.create(dataInput);
    if (id) {
      this.StudentRepo.findById(id).then((_) => {
        if (_) {
          this.event.emit({ topic: StudentEvent.onAfterCreate, data: _ });
          return _;
        } else {
        }
      });
      return {
        data: id,
        meta: {}
      };
    }
    throw new StudentError({ code: "STUDENT_CREATE_FAILED" });
  }

  async update(id, input: StudentUpdateInput): Promise<StudentUpdateResponse> {
    const dataInput: Partial<StudentDataInput> = StudentUpdateInput.parse(input);
    this.event.emit({ topic: StudentEvent.onBeforeUpdate, id, input: dataInput });
    const { data } = await this.StudentRepo.update(id, dataInput);
    if (data) {
      this.findById(id).then((_) => {
        if (_) {
          this.event.emit({ topic: StudentEvent.onAfterUpdate, data: _ });
        }
      });
      return {
        data,
        meta: {}
      };
    }
    throw new StudentError({ code: "STUDENT_UPDATE_FAILED", args: { id } });
  }

  async remove(id: string): Promise<StudentRemoveResponse> {
    this.event.emit({ topic: StudentEvent.onBeforeRemove, id });
    const { data } = await this.StudentRepo.remove(id);
    if (data) {
      this.event.emit({ topic: StudentEvent.onAfterRemove, id });
      return {
        data,
        meta: {}
      };
    }
    throw new StudentError({ code: "STUDENT_REMOVE_FAILED", args: { id } });
  }

  async findById(id: string): Promise<Student | undefined> {
    return await this.StudentRepo.findById(id);
  }

  async find(filter?: StudentFilter): Promise<Student[]> {
    return await this.StudentRepo.find(filter);
  }

  findPage(opts: PaginationOptions<StudentFilter>) {
    return this.StudentRepo.findPage(opts);
  }
}
