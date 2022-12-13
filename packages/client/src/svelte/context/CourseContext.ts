import { getContext, hasContext, setContext } from "svelte";
import {
  Course,
  CourseCreateResponse,
  CourseEvent,
  CourseFilter,
  CourseInput,
  CourseRemoveResponse,
  CourseService,
  CourseUpdateInput,
  CourseUpdateResponse
} from "@deboxsoft/lms-api";
import { Logger, Pagination, PaginationOptions } from "@deboxsoft/module-core";
import { createEventEmitter } from "@deboxsoft/module-client";
import { createPaginationStore, PaginationStore } from "@deboxsoft/module-client/libs/svelte";

type CourseContextOptions = {
  initial?: Course[];
  courseService: CourseService;
  logger: Logger;
};

export class CourseContext implements CourseService {
  private paginationStore: PaginationStore<Course, CourseFilter>;
  private logger: Logger;
  private courseService: CourseService;
  private event = createEventEmitter();

  constructor(opts: CourseContextOptions) {
    this.courseService = opts.courseService;
    this.paginationStore = createPaginationStore<Course, CourseFilter>({ initial: opts.initial });
    this.logger = opts.logger;
  }

  get dataStore() {
    return this.paginationStore.dataStore;
  }

  get pageInfo() {
    return this.paginationStore.pageInfo;
  }

  async create(input: CourseInput): Promise<CourseCreateResponse> {
    try {
      const _input = CourseInput.parse(input);
      this.event.emit(CourseEvent.onBeforeCreate, _input);
      const response = await this.courseService.create(input);
      const course = {
        ..._input,
        ...response.meta,
        id: response.data
      };
      this.paginationStore.dataStore.push(course);
      this.event.emit(CourseEvent.onAfterCreate, course);
      return response;
    } catch (e) {
      this.logger.debug(`[error] ${e?.message}`);
      throw e;
    }
  }

  async update(id: string, input: CourseUpdateInput): Promise<CourseUpdateResponse> {
    try {
      input = CourseUpdateInput.parse(input);
      this.event.emit(CourseEvent.onBeforeUpdate, { id, input });
      const response = await this.courseService.update(id, input);
      if (response.data) {
        this.paginationStore.dataStore.update({ id, input });
        this.event.emit(CourseEvent.onAfterUpdate, id, input);
      }
      return response;
    } catch (e) {
      this.logger.debug(`[error] ${e?.message}`);
      throw e;
    }
  }

  async remove(id: string, index?: number): Promise<CourseRemoveResponse> {
    try {
      this.event.emit(CourseEvent.onBeforeRemove, id);
      const response = await this.courseService.remove(id);
      if (response.data) {
        this.paginationStore.dataStore.remove({
          id,
          index
        });
        this.event.emit(CourseEvent.onAfterRemove, id);
      }
      return response;
    } catch (e) {
      this.logger.debug(`[error] ${e?.message}`);
      throw e;
    }
  }

  findById(id: string): Promise<Course | undefined> {
    return this.courseService.findById(id);
  }

  find(filter: CourseFilter): Promise<Course[]> {
    return this.courseService.find(filter);
  }

  findPage(filter: PaginationOptions<CourseFilter>): Promise<Pagination<Course>> {
    return this.courseService.findPage(filter);
  }
}

const courseContextKey = "BOOK-CONTEXT-KEY";
export const createCourseContext = (opts: CourseContextOptions) => {
  if (hasCourseContext()) {
    return getCourseContext();
  }
  const courseContext: CourseContext = new CourseContext(opts);
  setContext(courseContextKey, courseContext);
  return courseContext;
};

export const getCourseContext = () => getContext<CourseContext>(courseContextKey);

export const hasCourseContext = () => hasContext(courseContextKey);
