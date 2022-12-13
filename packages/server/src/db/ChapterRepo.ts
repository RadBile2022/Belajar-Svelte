import { Chapter, ChapterDataInput, ChapterFilter } from "@deboxsoft/lms-api";
import { Container, Pagination, PaginationOptions } from "@deboxsoft/module-core";
import { ModifiedResult, RepoTransactionOptions } from "@deboxsoft/module-server";

export const CHAPTER_REPO_KEY = "CHAPTER-REPO-KEY";
export const getChapterRepo = () => Container.get<ChapterRepo>(CHAPTER_REPO_KEY);
export interface ChapterRepo {
  create(input: ChapterDataInput, opts?: RepoTransactionOptions): Promise<ModifiedResult<string>>;
  update(id: string, input: Partial<ChapterDataInput>, opts?: RepoTransactionOptions): Promise<ModifiedResult<boolean>>;
  remove(id: string | string[], opts?: RepoTransactionOptions): Promise<ModifiedResult<boolean>>;
  findById(id: string, opts?: RepoTransactionOptions): Promise<Chapter | undefined>;
  find(filter?: ChapterFilter, opts?: RepoTransactionOptions): Promise<Chapter[]>;
  findPage(options?: PaginationOptions<ChapterFilter>): Promise<Pagination<Chapter>>;
}
