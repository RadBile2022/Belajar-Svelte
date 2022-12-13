import { Enrollment, EnrollmentDataInput, EnrollmentFilter } from "@deboxsoft/lms-api";
import { Container, Pagination, PaginationOptions } from "@deboxsoft/module-core";
import { ModifiedResult, RepoTransactionOptions } from "@deboxsoft/module-server";

export const ENROLLMENT_REPO_KEY = "ENROLLMENT-REPO-KEY";
export const getEnrollmentRepo = () => Container.get<EnrollmentRepo>(ENROLLMENT_REPO_KEY);
export interface EnrollmentRepo {
  create(input: EnrollmentDataInput, opts?: RepoTransactionOptions): Promise<ModifiedResult<string>>;
  update(
    id: string,
    input: Partial<EnrollmentDataInput>,
    opts?: RepoTransactionOptions
  ): Promise<ModifiedResult<boolean>>;
  remove(id: string | string[], opts?: RepoTransactionOptions): Promise<ModifiedResult<boolean>>;
  findById(id: string, opts?: RepoTransactionOptions): Promise<Enrollment | undefined>;
  find(filter?: EnrollmentFilter, opts?: RepoTransactionOptions): Promise<Enrollment[]>;
  findPage(options?: PaginationOptions<EnrollmentFilter>): Promise<Pagination<Enrollment>>;
}
