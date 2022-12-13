import { Container, getLogger, Logger, PaginationOptions } from "@deboxsoft/module-core";
import {
  BookFilter,
  Book,
  BookError,
  BookEvent,
  BookInput,
  BookService,
  BookUpdateInput,
  BookDataInput,
  BookCreateResponse,
  BookUpdateResponse,
  BookRemoveResponse,
  BOOK_SERVICE_KEY
} from "@deboxsoft/lms-api";
import { MQEmitter } from "mqemitter";
import { getBookRepo, BookRepo } from "../db/index.js";
import { LmsPoltekServerModuleConfig } from "../types.js";

export const createBookServiceServer = async (opts: LmsPoltekServerModuleConfig) => {
  const BookRepo = getBookRepo();
  const BookService = new BookServiceServer(BookRepo, opts);
  Container.set(BOOK_SERVICE_KEY, BookService);
  return BookService;
};

export class BookServiceServer implements BookService {
  logger: Logger;
  event: MQEmitter;
  constructor(private BookRepo: BookRepo, { event }: LmsPoltekServerModuleConfig) {
    this.logger = getLogger();
    this.event = event;
  }

  async create(input: BookInput): Promise<BookCreateResponse> {
    const dataInput: BookDataInput = BookInput.parse(input);
    this.event.emit({ topic: BookEvent.onBeforeCreate, input: dataInput });
    const { data: id } = await this.BookRepo.create(dataInput);
    if (id) {
      this.BookRepo.findById(id).then((_) => {
        if (_) {
          this.event.emit({ topic: BookEvent.onAfterCreate, data: _ });
          return _;
        } else {
        }
      });
      return {
        data: id,
        meta: {}
      };
    }
    throw new BookError({ code: "BOOK_CREATE_FAILED" });
  }

  async update(id, input: BookUpdateInput): Promise<BookUpdateResponse> {
    const dataInput: Partial<BookDataInput> = BookUpdateInput.parse(input);
    this.event.emit({ topic: BookEvent.onBeforeUpdate, id, input: dataInput });
    const { data } = await this.BookRepo.update(id, dataInput);
    if (data) {
      this.findById(id).then((_) => {
        if (_) {
          this.event.emit({ topic: BookEvent.onAfterUpdate, data: _ });
        }
      });
      return {
        data,
        meta: {}
      };
    }
    throw new BookError({ code: "BOOK_UPDATE_FAILED", args: { id } });
  }

  async remove(id: string): Promise<BookRemoveResponse> {
    this.event.emit({ topic: BookEvent.onBeforeRemove, id });
    const { data } = await this.BookRepo.remove(id);
    if (data) {
      this.event.emit({ topic: BookEvent.onAfterRemove, id });
      return {
        data,
        meta: {}
      };
    }
    throw new BookError({ code: "BOOK_REMOVE_FAILED", args: { id } });
  }

  async findById(id: string): Promise<Book | undefined> {
    return await this.BookRepo.findById(id);
  }

  async find(filter?: BookFilter): Promise<Book[]> {
    return await this.BookRepo.find(filter);
  }

  findPage(opts: PaginationOptions<BookFilter>) {
    return this.BookRepo.findPage(opts);
  }
}
