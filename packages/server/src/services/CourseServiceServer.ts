import { Container, getLogger, Logger, PaginationOptions } from "@deboxsoft/module-core";
import {
  CourseFilter,
  Course,
  CourseError,
  CourseEvent,
  CourseInput,
  CourseService,
  CourseUpdateInput,
  CourseDataInput,
  CourseCreateResponse,
  CourseUpdateResponse,
  CourseRemoveResponse,
  COURSE_SERVICE_KEY
} from "@deboxsoft/lms-api";
import { MQEmitter } from "mqemitter";
import { getCourseRepo, CourseRepo } from "../db/index.js";
import { LmsPoltekServerModuleConfig } from "../types.js";

export const createCourseServiceServer = async (opts: LmsPoltekServerModuleConfig) => {
  const CourseRepo = getCourseRepo();
  const CourseService = new CourseServiceServer(CourseRepo, opts);
  Container.set(COURSE_SERVICE_KEY, CourseService);
  return CourseService;
};

export class CourseServiceServer implements CourseService {
  logger: Logger;
  event: MQEmitter;
  constructor(private CourseRepo: CourseRepo, { event }: LmsPoltekServerModuleConfig) {
    this.logger = getLogger();
    this.event = event;
  }

  async create(input: CourseInput): Promise<CourseCreateResponse> {
    const dataInput: CourseDataInput = CourseInput.parse(input);
    this.event.emit({ topic: CourseEvent.onBeforeCreate, input: dataInput });
    const { data: id } = await this.CourseRepo.create(dataInput);
    if (id) {
      this.CourseRepo.findById(id).then((_) => {
        if (_) {
          this.event.emit({ topic: CourseEvent.onAfterCreate, data: _ });
          return _;
        } else {
        }
      });
      return {
        data: id,
        meta: {}
      };
    }
    throw new CourseError({ code: "COURSE_CREATE_FAILED" });
  }

  async update(id, input: CourseUpdateInput): Promise<CourseUpdateResponse> {
    const dataInput: Partial<CourseDataInput> = CourseUpdateInput.parse(input);
    this.event.emit({ topic: CourseEvent.onBeforeUpdate, id, input: dataInput });
    const { data } = await this.CourseRepo.update(id, dataInput);
    if (data) {
      this.findById(id).then((_) => {
        if (_) {
          this.event.emit({ topic: CourseEvent.onAfterUpdate, data: _ });
        }
      });
      return {
        data,
        meta: {}
      };
    }
    throw new CourseError({ code: "COURSE_UPDATE_FAILED", args: { id } });
  }

  async remove(id: string): Promise<CourseRemoveResponse> {
    this.event.emit({ topic: CourseEvent.onBeforeRemove, id });
    const { data } = await this.CourseRepo.remove(id);
    if (data) {
      this.event.emit({ topic: CourseEvent.onAfterRemove, id });
      return {
        data,
        meta: {}
      };
    }
    throw new CourseError({ code: "COURSE_REMOVE_FAILED", args: { id } });
  }

  async findById(id: string): Promise<Course | undefined> {
    return await this.CourseRepo.findById(id);
  }

  async find(filter?: CourseFilter): Promise<Course[]> {
    return await this.CourseRepo.find(filter);
  }

  findPage(opts: PaginationOptions<CourseFilter>) {
    return this.CourseRepo.findPage(opts);
  }
}
