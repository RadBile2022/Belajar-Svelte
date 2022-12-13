import { getContext, hasContext, setContext } from "svelte";
import {
  Chapter,
  ChapterCreateResponse,
  ChapterEvent,
  ChapterFilter,
  ChapterInput,
  ChapterRemoveResponse,
  ChapterService,
  ChapterUpdateInput,
  ChapterUpdateResponse
} from "@deboxsoft/lms-api";
import { Logger, Pagination, PaginationOptions } from "@deboxsoft/module-core";
import { createEventEmitter } from "@deboxsoft/module-client";
import { createPaginationStore, PaginationStore } from "@deboxsoft/module-client/libs/svelte";

type ChapterContextOptions = {
  initial?: Chapter[];
  chapterService: ChapterService;
  logger: Logger;
};

export class ChapterContext implements ChapterService {
  private paginationStore: PaginationStore<Chapter, ChapterFilter>;
  private logger: Logger;
  private chapterService: ChapterService;
  private event = createEventEmitter();

  constructor(opts: ChapterContextOptions) {
    this.chapterService = opts.chapterService;
    this.paginationStore = createPaginationStore<Chapter, ChapterFilter>({ initial: opts.initial });
    this.logger = opts.logger;
  }

  get dataStore() {
    return this.paginationStore.dataStore;
  }

  get pageInfo() {
    return this.paginationStore.pageInfo;
  }

  async create(input: ChapterInput): Promise<ChapterCreateResponse> {
    try {
      const _input = ChapterInput.parse(input);
      this.event.emit(ChapterEvent.onBeforeCreate, _input);
      const response = await this.chapterService.create(input);
      const chapter = {
        ..._input,
        ...response.meta,
        id: response.data
      };
      this.paginationStore.dataStore.push(chapter);
      this.event.emit(ChapterEvent.onAfterCreate, chapter);
      return response;
    } catch (e) {
      this.logger.debug(`[error] ${e?.message}`);
      throw e;
    }
  }

  async update(id: string, input: ChapterUpdateInput): Promise<ChapterUpdateResponse> {
    try {
      input = ChapterUpdateInput.parse(input);
      this.event.emit(ChapterEvent.onBeforeUpdate, { id, input });
      const response = await this.chapterService.update(id, input);
      if (response.data) {
        this.paginationStore.dataStore.update({ id, input });
        this.event.emit(ChapterEvent.onAfterUpdate, id, input);
      }
      return response;
    } catch (e) {
      this.logger.debug(`[error] ${e?.message}`);
      throw e;
    }
  }

  async remove(id: string, index?: number): Promise<ChapterRemoveResponse> {
    try {
      this.event.emit(ChapterEvent.onBeforeRemove, id);
      const response = await this.chapterService.remove(id);
      if (response.data) {
        this.paginationStore.dataStore.remove({
          id,
          index
        });
        this.event.emit(ChapterEvent.onAfterRemove, id);
      }
      return response;
    } catch (e) {
      this.logger.debug(`[error] ${e?.message}`);
      throw e;
    }
  }

  findById(id: string): Promise<Chapter | undefined> {
    return this.chapterService.findById(id);
  }

  find(filter: ChapterFilter): Promise<Chapter[]> {
    return this.chapterService.find(filter);
  }

  findPage(filter: PaginationOptions<ChapterFilter>): Promise<Pagination<Chapter>> {
    return this.chapterService.findPage(filter);
  }
}

const chapterContextKey = "BOOK-CONTEXT-KEY";
export const createChapterContext = (opts: ChapterContextOptions) => {
  if (hasChapterContext()) {
    return getChapterContext();
  }
  const chapterContext: ChapterContext = new ChapterContext(opts);
  setContext(chapterContextKey, chapterContext);
  return chapterContext;
};

export const getChapterContext = () => getContext<ChapterContext>(chapterContextKey);

export const hasChapterContext = () => hasContext(chapterContextKey);
