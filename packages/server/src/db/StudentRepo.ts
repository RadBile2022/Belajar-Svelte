import { Student, StudentDataInput, StudentFilter } from "@deboxsoft/lms-api";
import { Container, Pagination, PaginationOptions } from "@deboxsoft/module-core";
import { ModifiedResult, RepoTransactionOptions } from "@deboxsoft/module-server";

export const STUDENT_REPO_KEY = "STUDENT-REPO-KEY";
export const getStudentRepo = () => Container.get<StudentRepo>(STUDENT_REPO_KEY);
export interface StudentRepo {
  create(input: StudentDataInput, opts?: RepoTransactionOptions): Promise<ModifiedResult<string>>;
  update(id: string, input: Partial<StudentDataInput>, opts?: RepoTransactionOptions): Promise<ModifiedResult<boolean>>;
  remove(id: string | string[], opts?: RepoTransactionOptions): Promise<ModifiedResult<boolean>>;
  findById(id: string, opts?: RepoTransactionOptions): Promise<Student | undefined>;
  find(filter?: StudentFilter, opts?: RepoTransactionOptions): Promise<Student[]>;
  findPage(options?: PaginationOptions<StudentFilter>): Promise<Pagination<Student>>;
}
