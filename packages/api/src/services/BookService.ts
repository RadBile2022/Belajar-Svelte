import {
  Book,
  BookCreateResponse,
  BookFilter,
  BookInput,
  BookRemoveResponse,
  BookUpdateInput,
  BookUpdateResponse
} from "../models/index.js";
import { Container, Pagination, PaginationOptions } from "@deboxsoft/module-core";

export const BookEvent = {
  onBeforeCreate: "BOOK-BEFORE-CREATE",
  onAfterCreate: "BOOK-AFTER-CREATE",
  onBeforeUpdate: "BOOK-BEFORE-UPDATE",
  onAfterUpdate: "BOOK-AFTER-UPDATE-EVENT",
  onBeforeRemove: "BOOK-BEFORE-REMOVE-EVENT",
  onAfterRemove: "BOOK-AFTER-REMOVE-EVENT"
};
export const BOOK_SERVICE_KEY = "BOOK-SERVICE-KEY";
export const getBookService = <S extends BookService = BookService>() => Container.get<S>(BOOK_SERVICE_KEY);
export const hasBookService = () => Container.has(BOOK_SERVICE_KEY);
export interface BookService {
  create(input: BookInput): Promise<BookCreateResponse>;
  update(id: string, input: BookUpdateInput): Promise<BookUpdateResponse>;
  remove(id: string): Promise<BookRemoveResponse>;
  findById(id: string): Promise<Book | undefined>;
  find(filter?: Record<string, any>): Promise<Book[]>;
  findPage(options?: PaginationOptions<BookFilter>): Promise<Pagination<Book>>;
}
