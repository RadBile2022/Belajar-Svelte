import { Quiz, QuizDataInput, QuizFilter } from "@deboxsoft/lms-api";
import { Container, Pagination, PaginationOptions } from "@deboxsoft/module-core";
import { ModifiedResult, RepoTransactionOptions } from "@deboxsoft/module-server";

export const QUIZ_REPO_KEY = "QUIZ-REPO-KEY";
export const getQuizRepo = () => Container.get<QuizRepo>(QUIZ_REPO_KEY);
export interface QuizRepo {
  create(input: QuizDataInput, opts?: RepoTransactionOptions): Promise<ModifiedResult<string>>;
  update(id: string, input: Partial<QuizDataInput>, opts?: RepoTransactionOptions): Promise<ModifiedResult<boolean>>;
  remove(id: string | string[], opts?: RepoTransactionOptions): Promise<ModifiedResult<boolean>>;
  findById(id: string, opts?: RepoTransactionOptions): Promise<Quiz | undefined>;
  find(filter?: QuizFilter, opts?: RepoTransactionOptions): Promise<Quiz[]>;
  findPage(options?: PaginationOptions<QuizFilter>): Promise<Pagination<Quiz>>;
}
