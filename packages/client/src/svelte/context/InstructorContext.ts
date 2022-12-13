import { getContext, hasContext, setContext } from "svelte";
import {
  Instructor,
  InstructorCreateResponse,
  InstructorEvent,
  InstructorFilter,
  InstructorInput,
  InstructorRemoveResponse,
  InstructorService,
  InstructorUpdateInput,
  InstructorUpdateResponse
} from "@deboxsoft/lms-api";
import { Logger, Pagination, PaginationOptions } from "@deboxsoft/module-core";
import { createEventEmitter } from "@deboxsoft/module-client";
import { createPaginationStore, PaginationStore } from "@deboxsoft/module-client/libs/svelte";

type InstructorContextOptions = {
  initial?: Instructor[];
  instructorService: InstructorService;
  logger: Logger;
};

export class InstructorContext implements InstructorService {
  private paginationStore: PaginationStore<Instructor, InstructorFilter>;
  private logger: Logger;
  private instructorService: InstructorService;
  private event = createEventEmitter();

  constructor(opts: InstructorContextOptions) {
    this.instructorService = opts.instructorService;
    this.paginationStore = createPaginationStore<Instructor, InstructorFilter>({ initial: opts.initial });
    this.logger = opts.logger;
  }

  get dataStore() {
    return this.paginationStore.dataStore;
  }

  get pageInfo() {
    return this.paginationStore.pageInfo;
  }

  async create(input: InstructorInput): Promise<InstructorCreateResponse> {
    try {
      const _input = InstructorInput.parse(input);
      this.event.emit(InstructorEvent.onBeforeCreate, _input);
      const response = await this.instructorService.create(input);
      const instructor = {
        ..._input,
        ...response.meta,
        id: response.data
      };
      this.paginationStore.dataStore.push(instructor);
      this.event.emit(InstructorEvent.onAfterCreate, instructor);
      return response;
    } catch (e) {
      this.logger.debug(`[error] ${e?.message}`);
      throw e;
    }
  }

  async update(id: string, input: InstructorUpdateInput): Promise<InstructorUpdateResponse> {
    try {
      input = InstructorUpdateInput.parse(input);
      this.event.emit(InstructorEvent.onBeforeUpdate, { id, input });
      const response = await this.instructorService.update(id, input);
      if (response.data) {
        this.paginationStore.dataStore.update({ id, input });
        this.event.emit(InstructorEvent.onAfterUpdate, id, input);
      }
      return response;
    } catch (e) {
      this.logger.debug(`[error] ${e?.message}`);
      throw e;
    }
  }

  async remove(id: string, index?: number): Promise<InstructorRemoveResponse> {
    try {
      this.event.emit(InstructorEvent.onBeforeRemove, id);
      const response = await this.instructorService.remove(id);
      if (response.data) {
        this.paginationStore.dataStore.remove({
          id,
          index
        });
        this.event.emit(InstructorEvent.onAfterRemove, id);
      }
      return response;
    } catch (e) {
      this.logger.debug(`[error] ${e?.message}`);
      throw e;
    }
  }

  findById(id: string): Promise<Instructor | undefined> {
    return this.instructorService.findById(id);
  }

  find(filter: InstructorFilter): Promise<Instructor[]> {
    return this.instructorService.find(filter);
  }

  findPage(filter: PaginationOptions<InstructorFilter>): Promise<Pagination<Instructor>> {
    return this.instructorService.findPage(filter);
  }
}

const instructorContextKey = "BOOK-CONTEXT-KEY";
export const createInstructorContext = (opts: InstructorContextOptions) => {
  if (hasInstructorContext()) {
    return getInstructorContext();
  }
  const instructorContext: InstructorContext = new InstructorContext(opts);
  setContext(instructorContextKey, instructorContext);
  return instructorContext;
};

export const getInstructorContext = () => getContext<InstructorContext>(instructorContextKey);

export const hasInstructorContext = () => hasContext(instructorContextKey);
