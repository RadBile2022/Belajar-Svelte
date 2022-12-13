import { Instructor, InstructorDataInput, InstructorFilter } from "@deboxsoft/lms-api";
import { Container, Pagination, PaginationOptions } from "@deboxsoft/module-core";
import { ModifiedResult, RepoTransactionOptions } from "@deboxsoft/module-server";

export const INSTRUCTOR_REPO_KEY = "INSTRUCTOR-REPO-KEY";
export const getInstructorRepo = () => Container.get<InstructorRepo>(INSTRUCTOR_REPO_KEY);
export interface InstructorRepo {
  create(input: InstructorDataInput, opts?: RepoTransactionOptions): Promise<ModifiedResult<string>>;
  update(
    id: string,
    input: Partial<InstructorDataInput>,
    opts?: RepoTransactionOptions
  ): Promise<ModifiedResult<boolean>>;
  remove(id: string | string[], opts?: RepoTransactionOptions): Promise<ModifiedResult<boolean>>;
  findById(id: string, opts?: RepoTransactionOptions): Promise<Instructor | undefined>;
  find(filter?: InstructorFilter, opts?: RepoTransactionOptions): Promise<Instructor[]>;
  findPage(options?: PaginationOptions<InstructorFilter>): Promise<Pagination<Instructor>>;
}
