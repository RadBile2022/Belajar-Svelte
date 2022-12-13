import { getContext, hasContext, setContext } from "svelte";
import {
  Enrollment,
  EnrollmentCreateResponse,
  EnrollmentEvent,
  EnrollmentFilter,
  EnrollmentInput,
  EnrollmentRemoveResponse,
  EnrollmentService,
  EnrollmentUpdateInput,
  EnrollmentUpdateResponse
} from "@deboxsoft/lms-api";
import { Logger, Pagination, PaginationOptions } from "@deboxsoft/module-core";
import { createEventEmitter } from "@deboxsoft/module-client";
import { createPaginationStore, PaginationStore } from "@deboxsoft/module-client/libs/svelte";

type EnrollmentContextOptions = {
  initial?: Enrollment[];
  enrollmentService: EnrollmentService;
  logger: Logger;
};

export class EnrollmentContext implements EnrollmentService {
  private paginationStore: PaginationStore<Enrollment, EnrollmentFilter>;
  private logger: Logger;
  private enrollmentService: EnrollmentService;
  private event = createEventEmitter();

  constructor(opts: EnrollmentContextOptions) {
    this.enrollmentService = opts.enrollmentService;
    this.paginationStore = createPaginationStore<Enrollment, EnrollmentFilter>({ initial: opts.initial });
    this.logger = opts.logger;
  }

  get dataStore() {
    return this.paginationStore.dataStore;
  }

  get pageInfo() {
    return this.paginationStore.pageInfo;
  }

  async create(input: EnrollmentInput): Promise<EnrollmentCreateResponse> {
    try {
      const _input = EnrollmentInput.parse(input);
      this.event.emit(EnrollmentEvent.onBeforeCreate, _input);
      const response = await this.enrollmentService.create(input);
      const enrollment = {
        ..._input,
        ...response.meta,
        id: response.data
      };
      this.paginationStore.dataStore.push(enrollment);
      this.event.emit(EnrollmentEvent.onAfterCreate, enrollment);
      return response;
    } catch (e) {
      this.logger.debug(`[error] ${e?.message}`);
      throw e;
    }
  }

  async update(id: string, input: EnrollmentUpdateInput): Promise<EnrollmentUpdateResponse> {
    try {
      input = EnrollmentUpdateInput.parse(input);
      this.event.emit(EnrollmentEvent.onBeforeUpdate, { id, input });
      const response = await this.enrollmentService.update(id, input);
      if (response.data) {
        this.paginationStore.dataStore.update({ id, input });
        this.event.emit(EnrollmentEvent.onAfterUpdate, id, input);
      }
      return response;
    } catch (e) {
      this.logger.debug(`[error] ${e?.message}`);
      throw e;
    }
  }

  async remove(id: string, index?: number): Promise<EnrollmentRemoveResponse> {
    try {
      this.event.emit(EnrollmentEvent.onBeforeRemove, id);
      const response = await this.enrollmentService.remove(id);
      if (response.data) {
        this.paginationStore.dataStore.remove({
          id,
          index
        });
        this.event.emit(EnrollmentEvent.onAfterRemove, id);
      }
      return response;
    } catch (e) {
      this.logger.debug(`[error] ${e?.message}`);
      throw e;
    }
  }

  findById(id: string): Promise<Enrollment | undefined> {
    return this.enrollmentService.findById(id);
  }

  find(filter: EnrollmentFilter): Promise<Enrollment[]> {
    return this.enrollmentService.find(filter);
  }

  findPage(filter: PaginationOptions<EnrollmentFilter>): Promise<Pagination<Enrollment>> {
    return this.enrollmentService.findPage(filter);
  }
}

const enrollmentContextKey = "BOOK-CONTEXT-KEY";
export const createEnrollmentContext = (opts: EnrollmentContextOptions) => {
  if (hasEnrollmentContext()) {
    return getEnrollmentContext();
  }
  const enrollmentContext: EnrollmentContext = new EnrollmentContext(opts);
  setContext(enrollmentContextKey, enrollmentContext);
  return enrollmentContext;
};

export const getEnrollmentContext = () => getContext<EnrollmentContext>(enrollmentContextKey);

export const hasEnrollmentContext = () => hasContext(enrollmentContextKey);
