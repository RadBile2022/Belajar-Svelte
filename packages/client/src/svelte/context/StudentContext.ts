import { getContext, hasContext, setContext } from "svelte";
import {
  Student,
  StudentCreateResponse,
  StudentEvent,
  StudentFilter,
  StudentInput,
  StudentRemoveResponse,
  StudentService,
  StudentUpdateInput,
  StudentUpdateResponse
} from "@deboxsoft/lms-api";
import { Logger, Pagination, PaginationOptions } from "@deboxsoft/module-core";
import { createEventEmitter } from "@deboxsoft/module-client";
import { createPaginationStore, PaginationStore } from "@deboxsoft/module-client/libs/svelte";

type StudentContextOptions = {
  initial?: Student[];
  studentService: StudentService;
  logger: Logger;
};

export class StudentContext implements StudentService {
  private paginationStore: PaginationStore<Student, StudentFilter>;
  private logger: Logger;
  private studentService: StudentService;
  private event = createEventEmitter();

  constructor(opts: StudentContextOptions) {
    this.studentService = opts.studentService;
    this.paginationStore = createPaginationStore<Student, StudentFilter>({ initial: opts.initial });
    this.logger = opts.logger;
  }

  get dataStore() {
    return this.paginationStore.dataStore;
  }

  get pageInfo() {
    return this.paginationStore.pageInfo;
  }

  async create(input: StudentInput): Promise<StudentCreateResponse> {
    try {
      const _input = StudentInput.parse(input);
      this.event.emit(StudentEvent.onBeforeCreate, _input);
      const response = await this.studentService.create(input);
      const student = {
        ..._input,
        ...response.meta,
        id: response.data
      };
      this.paginationStore.dataStore.push(student);
      this.event.emit(StudentEvent.onAfterCreate, student);
      return response;
    } catch (e) {
      this.logger.debug(`[error] ${e?.message}`);
      throw e;
    }
  }

  async update(id: string, input: StudentUpdateInput): Promise<StudentUpdateResponse> {
    try {
      input = StudentUpdateInput.parse(input);
      this.event.emit(StudentEvent.onBeforeUpdate, { id, input });
      const response = await this.studentService.update(id, input);
      if (response.data) {
        this.paginationStore.dataStore.update({ id, input });
        this.event.emit(StudentEvent.onAfterUpdate, id, input);
      }
      return response;
    } catch (e) {
      this.logger.debug(`[error] ${e?.message}`);
      throw e;
    }
  }

  async remove(id: string, index?: number): Promise<StudentRemoveResponse> {
    try {
      this.event.emit(StudentEvent.onBeforeRemove, id);
      const response = await this.studentService.remove(id);
      if (response.data) {
        this.paginationStore.dataStore.remove({
          id,
          index
        });
        this.event.emit(StudentEvent.onAfterRemove, id);
      }
      return response;
    } catch (e) {
      this.logger.debug(`[error] ${e?.message}`);
      throw e;
    }
  }

  findById(id: string): Promise<Student | undefined> {
    return this.studentService.findById(id);
  }

  find(filter: StudentFilter): Promise<Student[]> {
    return this.studentService.find(filter);
  }

  findPage(filter: PaginationOptions<StudentFilter>): Promise<Pagination<Student>> {
    return this.studentService.findPage(filter);
  }
}

const studentContextKey = "BOOK-CONTEXT-KEY";
export const createStudentContext = (opts: StudentContextOptions) => {
  if (hasStudentContext()) {
    return getStudentContext();
  }
  const studentContext: StudentContext = new StudentContext(opts);
  setContext(studentContextKey, studentContext);
  return studentContext;
};

export const getStudentContext = () => getContext<StudentContext>(studentContextKey);

export const hasStudentContext = () => hasContext(studentContextKey);
