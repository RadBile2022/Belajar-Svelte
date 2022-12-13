import { Book, BookDataInput, BookFilter } from "@deboxsoft/lms-api";
import { Container, Pagination, PaginationOptions } from "@deboxsoft/module-core";
import { ModifiedResult, RepoTransactionOptions } from "@deboxsoft/module-server";

export const BOOK_REPO_KEY = "BOOK-REPO-KEY";
export const getBookRepo = () => Container.get<BookRepo>(BOOK_REPO_KEY);
export interface BookRepo {
  create(input: BookDataInput, opts?: RepoTransactionOptions): Promise<ModifiedResult<string>>;
  update(id: string, input: Partial<BookDataInput>, opts?: RepoTransactionOptions): Promise<ModifiedResult<boolean>>;
  remove(id: string | string[], opts?: RepoTransactionOptions): Promise<ModifiedResult<boolean>>;
  findById(id: string, opts?: RepoTransactionOptions): Promise<Book | undefined>;
  find(filter?: BookFilter, opts?: RepoTransactionOptions): Promise<Book[]>;
  findPage(options?: PaginationOptions<BookFilter>): Promise<Pagination<Book>>;
}
