import {
  JobSheet,
  JobSheetCreateResponse,
  JobSheetFilter,
  JobSheetInput,
  JobSheetRemoveResponse,
  JobSheetUpdateInput,
  JobSheetUpdateResponse
} from "../models/index.js";
import { Container, Pagination, PaginationOptions } from "@deboxsoft/module-core";

export const JobSheetEvent = {
  onBeforeCreate: "JOB_SHEET-BEFORE-CREATE",
  onAfterCreate: "JOB_SHEET-AFTER-CREATE",
  onBeforeUpdate: "JOB_SHEET-BEFORE-UPDATE",
  onAfterUpdate: "JOB_SHEET-AFTER-UPDATE-EVENT",
  onBeforeRemove: "JOB_SHEET-BEFORE-REMOVE-EVENT",
  onAfterRemove: "JOB_SHEET-AFTER-REMOVE-EVENT"
};
export const JOB_SHEET_SERVICE_KEY = "JOB_SHEET-SERVICE-KEY";
export const getJobSheetService = <S extends JobSheetService = JobSheetService>() => Container.get<S>(JOB_SHEET_SERVICE_KEY);
export const hasJobSheetService = () => Container.has(JOB_SHEET_SERVICE_KEY);
export interface JobSheetService {
  create(input: JobSheetInput): Promise<JobSheetCreateResponse>;
  update(id: string, input: JobSheetUpdateInput): Promise<JobSheetUpdateResponse>;
  remove(id: string): Promise<JobSheetRemoveResponse>;
  findById(id: string): Promise<JobSheet | undefined>;
  find(filter?: Record<string, any>): Promise<JobSheet[]>;
  findPage(options?: PaginationOptions<JobSheetFilter>): Promise<Pagination<JobSheet>>;
}
