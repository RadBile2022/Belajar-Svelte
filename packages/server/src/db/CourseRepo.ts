import { Course, CourseDataInput, CourseFilter } from "@deboxsoft/lms-api";
import { Container, Pagination, PaginationOptions } from "@deboxsoft/module-core";
import { ModifiedResult, RepoTransactionOptions } from "@deboxsoft/module-server";

export const COURSE_REPO_KEY = "COURSE-REPO-KEY";
export const getCourseRepo = () => Container.get<CourseRepo>(COURSE_REPO_KEY);
export interface CourseRepo {
  create(input: CourseDataInput, opts?: RepoTransactionOptions): Promise<ModifiedResult<string>>;
  update(id: string, input: Partial<CourseDataInput>, opts?: RepoTransactionOptions): Promise<ModifiedResult<boolean>>;
  remove(id: string | string[], opts?: RepoTransactionOptions): Promise<ModifiedResult<boolean>>;
  findById(id: string, opts?: RepoTransactionOptions): Promise<Course | undefined>;
  find(filter?: CourseFilter, opts?: RepoTransactionOptions): Promise<Course[]>;
  findPage(options?: PaginationOptions<CourseFilter>): Promise<Pagination<Course>>;
}
