import { getContext, hasContext, setContext } from "svelte";
import {
  Quiz,
  QuizCreateResponse,
  QuizEvent,
  QuizFilter,
  QuizInput,
  QuizRemoveResponse,
  QuizService,
  QuizUpdateInput,
  QuizUpdateResponse
} from "@deboxsoft/lms-api";
import { Logger, Pagination, PaginationOptions } from "@deboxsoft/module-core";
import { createEventEmitter } from "@deboxsoft/module-client";
import { createPaginationStore, PaginationStore } from "@deboxsoft/module-client/libs/svelte";

type QuizContextOptions = {
  initial?: Quiz[];
  quizService: QuizService;
  logger: Logger;
};

export class QuizContext implements QuizService {
  private paginationStore: PaginationStore<Quiz, QuizFilter>;
  private logger: Logger;
  private quizService: QuizService;
  private event = createEventEmitter();

  constructor(opts: QuizContextOptions) {
    this.quizService = opts.quizService;
    this.paginationStore = createPaginationStore<Quiz, QuizFilter>({ initial: opts.initial });
    this.logger = opts.logger;
  }

  get dataStore() {
    return this.paginationStore.dataStore;
  }

  get pageInfo() {
    return this.paginationStore.pageInfo;
  }

  async create(input: QuizInput): Promise<QuizCreateResponse> {
    try {
      const _input = QuizInput.parse(input);
      this.event.emit(QuizEvent.onBeforeCreate, _input);
      const response = await this.quizService.create(input);
      const quiz = {
        ..._input,
        ...response.meta,
        id: response.data
      };
      this.paginationStore.dataStore.push(quiz);
      this.event.emit(QuizEvent.onAfterCreate, quiz);
      return response;
    } catch (e) {
      this.logger.debug(`[error] ${e?.message}`);
      throw e;
    }
  }

  async update(id: string, input: QuizUpdateInput): Promise<QuizUpdateResponse> {
    try {
      input = QuizUpdateInput.parse(input);
      this.event.emit(QuizEvent.onBeforeUpdate, { id, input });
      const response = await this.quizService.update(id, input);
      if (response.data) {
        this.paginationStore.dataStore.update({ id, input });
        this.event.emit(QuizEvent.onAfterUpdate, id, input);
      }
      return response;
    } catch (e) {
      this.logger.debug(`[error] ${e?.message}`);
      throw e;
    }
  }

  async remove(id: string, index?: number): Promise<QuizRemoveResponse> {
    try {
      this.event.emit(QuizEvent.onBeforeRemove, id);
      const response = await this.quizService.remove(id);
      if (response.data) {
        this.paginationStore.dataStore.remove({
          id,
          index
        });
        this.event.emit(QuizEvent.onAfterRemove, id);
      }
      return response;
    } catch (e) {
      this.logger.debug(`[error] ${e?.message}`);
      throw e;
    }
  }

  findById(id: string): Promise<Quiz | undefined> {
    return this.quizService.findById(id);
  }

  find(filter: QuizFilter): Promise<Quiz[]> {
    return this.quizService.find(filter);
  }

  findPage(filter: PaginationOptions<QuizFilter>): Promise<Pagination<Quiz>> {
    return this.quizService.findPage(filter);
  }
}

const quizContextKey = "BOOK-CONTEXT-KEY";
export const createQuizContext = (opts: QuizContextOptions) => {
  if (hasQuizContext()) {
    return getQuizContext();
  }
  const quizContext: QuizContext = new QuizContext(opts);
  setContext(quizContextKey, quizContext);
  return quizContext;
};

export const getQuizContext = () => getContext<QuizContext>(quizContextKey);

export const hasQuizContext = () => hasContext(quizContextKey);
