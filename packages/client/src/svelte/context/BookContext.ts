import { getContext, hasContext, setContext } from "svelte";
import {
  Book,
  BookCreateResponse,
  BookEvent,
  BookFilter,
  BookInput,
  BookRemoveResponse,
  BookService,
  BookUpdateInput,
  BookUpdateResponse
} from "@deboxsoft/lms-api";
import { Logger, Pagination, PaginationOptions } from "@deboxsoft/module-core";
import { createEventEmitter } from "@deboxsoft/module-client";
import { createPaginationStore, PaginationStore } from "@deboxsoft/module-client/libs/svelte";

type BookContextOptions = {
  initial?: Book[];
  bookService: BookService;
  logger: Logger;
};

export class BookContext implements BookService {
  private paginationStore: PaginationStore<Book, BookFilter>;
  private logger: Logger;
  private bookService: BookService;
  private event = createEventEmitter();

  constructor(opts: BookContextOptions) {
    this.bookService = opts.bookService;
    this.paginationStore = createPaginationStore<Book, BookFilter>({ initial: opts.initial });
    this.logger = opts.logger;
  }

  get dataStore() {
    return this.paginationStore.dataStore;
  }

  get pageInfo() {
    return this.paginationStore.pageInfo;
  }

  async create(input: BookInput): Promise<BookCreateResponse> {
    try {
      const _input = BookInput.parse(input);
      this.event.emit(BookEvent.onBeforeCreate, _input);
      const response = await this.bookService.create(input);
      const book = {
        ..._input,
        ...response.meta,
        id: response.data
      };
      this.paginationStore.dataStore.push(book);
      this.event.emit(BookEvent.onAfterCreate, book);
      return response;
    } catch (e) {
      this.logger.debug(`[error] ${e?.message}`);
      throw e;
    }
  }

  async update(id: string, input: BookUpdateInput): Promise<BookUpdateResponse> {
    try {
      input = BookUpdateInput.parse(input);
      this.event.emit(BookEvent.onBeforeUpdate, { id, input });
      const response = await this.bookService.update(id, input);
      if (response.data) {
        this.paginationStore.dataStore.update({ id, input });
        this.event.emit(BookEvent.onAfterUpdate, id, input);
      }
      return response;
    } catch (e) {
      this.logger.debug(`[error] ${e?.message}`);
      throw e;
    }
  }

  async remove(id: string, index?: number): Promise<BookRemoveResponse> {
    try {
      this.event.emit(BookEvent.onBeforeRemove, id);
      const response = await this.bookService.remove(id);
      if (response.data) {
        this.paginationStore.dataStore.remove({
          id,
          index
        });
        this.event.emit(BookEvent.onAfterRemove, id);
      }
      return response;
    } catch (e) {
      this.logger.debug(`[error] ${e?.message}`);
      throw e;
    }
  }

  findById(id: string): Promise<Book | undefined> {
    return this.bookService.findById(id);
  }

  find(filter: BookFilter): Promise<Book[]> {
    return this.bookService.find(filter);
  }

  findPage(filter: PaginationOptions<BookFilter>): Promise<Pagination<Book>> {
    return this.bookService.findPage(filter);
  }
}

const bookContextKey = "BOOK-CONTEXT-KEY";
export const createBookContext = (opts: BookContextOptions) => {
  if (hasBookContext()) {
    return getBookContext();
  }
  const bookContext: BookContext = new BookContext(opts);
  setContext(bookContextKey, bookContext);
  return bookContext;
};

export const getBookContext = () => getContext<BookContext>(bookContextKey);

export const hasBookContext = () => hasContext(bookContextKey);
