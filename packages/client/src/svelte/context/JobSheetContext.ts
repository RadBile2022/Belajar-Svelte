import { getContext, hasContext, setContext } from "svelte";
import {
  JobSheet,
  JobSheetCreateResponse,
  JobSheetEvent,
  JobSheetFilter,
  JobSheetInput,
  JobSheetRemoveResponse,
  JobSheetService,
  JobSheetUpdateInput,
  JobSheetUpdateResponse
} from "@deboxsoft/lms-api";
import { Logger, Pagination, PaginationOptions } from "@deboxsoft/module-core";
import { createEventEmitter } from "@deboxsoft/module-client";
import { createPaginationStore, PaginationStore } from "@deboxsoft/module-client/libs/svelte";

type JobSheetContextOptions = {
  initial?: JobSheet[];
  jobSheetService: JobSheetService;
  logger: Logger;
};

export class JobSheetContext implements JobSheetService {
  private paginationStore: PaginationStore<JobSheet, JobSheetFilter>;
  private logger: Logger;
  private jobSheetService: JobSheetService;
  private event = createEventEmitter();

  constructor(opts: JobSheetContextOptions) {
    this.jobSheetService = opts.jobSheetService;
    this.paginationStore = createPaginationStore<JobSheet, JobSheetFilter>({ initial: opts.initial });
    this.logger = opts.logger;
  }

  get dataStore() {
    return this.paginationStore.dataStore;
  }

  get pageInfo() {
    return this.paginationStore.pageInfo;
  }

  async create(input: JobSheetInput): Promise<JobSheetCreateResponse> {
    try {
      const _input = JobSheetInput.parse(input);
      this.event.emit(JobSheetEvent.onBeforeCreate, _input);
      const response = await this.jobSheetService.create(input);
      const jobSheet = {
        ..._input,
        ...response.meta,
        id: response.data
      };
      this.paginationStore.dataStore.push(jobSheet);
      this.event.emit(JobSheetEvent.onAfterCreate, jobSheet);
      return response;
    } catch (e) {
      this.logger.debug(`[error] ${e?.message}`);
      throw e;
    }
  }

  async update(id: string, input: JobSheetUpdateInput): Promise<JobSheetUpdateResponse> {
    try {
      input = JobSheetUpdateInput.parse(input);
      this.event.emit(JobSheetEvent.onBeforeUpdate, { id, input });
      const response = await this.jobSheetService.update(id, input);
      if (response.data) {
        this.paginationStore.dataStore.update({ id, input });
        this.event.emit(JobSheetEvent.onAfterUpdate, id, input);
      }
      return response;
    } catch (e) {
      this.logger.debug(`[error] ${e?.message}`);
      throw e;
    }
  }

  async remove(id: string, index?: number): Promise<JobSheetRemoveResponse> {
    try {
      this.event.emit(JobSheetEvent.onBeforeRemove, id);
      const response = await this.jobSheetService.remove(id);
      if (response.data) {
        this.paginationStore.dataStore.remove({
          id,
          index
        });
        this.event.emit(JobSheetEvent.onAfterRemove, id);
      }
      return response;
    } catch (e) {
      this.logger.debug(`[error] ${e?.message}`);
      throw e;
    }
  }

  findById(id: string): Promise<JobSheet | undefined> {
    return this.jobSheetService.findById(id);
  }

  find(filter: JobSheetFilter): Promise<JobSheet[]> {
    return this.jobSheetService.find(filter);
  }

  findPage(filter: PaginationOptions<JobSheetFilter>): Promise<Pagination<JobSheet>> {
    return this.jobSheetService.findPage(filter);
  }
}

const jobSheetContextKey = "BOOK-CONTEXT-KEY";
export const createJobSheetContext = (opts: JobSheetContextOptions) => {
  if (hasJobSheetContext()) {
    return getJobSheetContext();
  }
  const jobSheetContext: JobSheetContext = new JobSheetContext(opts);
  setContext(jobSheetContextKey, jobSheetContext);
  return jobSheetContext;
};

export const getJobSheetContext = () => getContext<JobSheetContext>(jobSheetContextKey);

export const hasJobSheetContext = () => hasContext(jobSheetContextKey);
