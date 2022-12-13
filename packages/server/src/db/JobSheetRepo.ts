import { JobSheet, JobSheetDataInput, JobSheetFilter } from "@deboxsoft/lms-api";
import { Container, Pagination, PaginationOptions } from "@deboxsoft/module-core";
import { ModifiedResult, RepoTransactionOptions } from "@deboxsoft/module-server";

export const JOB_SHEET_REPO_KEY = "JOB_SHEET-REPO-KEY";
export const getJobSheetRepo = () => Container.get<JobSheetRepo>(JOB_SHEET_REPO_KEY);
export interface JobSheetRepo {
  create(input: JobSheetDataInput, opts?: RepoTransactionOptions): Promise<ModifiedResult<string>>;
  update(
    id: string,
    input: Partial<JobSheetDataInput>,
    opts?: RepoTransactionOptions
  ): Promise<ModifiedResult<boolean>>;
  remove(id: string | string[], opts?: RepoTransactionOptions): Promise<ModifiedResult<boolean>>;
  findById(id: string, opts?: RepoTransactionOptions): Promise<JobSheet | undefined>;
  find(filter?: JobSheetFilter, opts?: RepoTransactionOptions): Promise<JobSheet[]>;
  findPage(options?: PaginationOptions<JobSheetFilter>): Promise<Pagination<JobSheet>>;
}
