import {
  z,
  Filter,
  CreateDataResponse,
  UpdateDataResponse,
  IdSchema,
  RemoveDataResponse,
  DataResponse,
  Pagination
} from "@deboxsoft/module-core";

export const JobSheetInput = z.object({
});
export const JobSheetUpdateInput = JobSheetInput.partial();
export const JobSheetDataInput = JobSheetInput;
export const JobSheetData = JobSheetDataInput.extend({
  id: IdSchema
});

export type JobSheetInput = z.input<typeof JobSheetInput>;
export type JobSheetUpdateInput = z.input<typeof JobSheetUpdateInput>;
export type JobSheetDataInput = z.input<typeof JobSheetDataInput>;
export type JobSheetData = z.output<typeof JobSheetData>;
export type JobSheet = JobSheetData;
export type JobSheetFilter = Filter<JobSheetDataInput>;
export type JobSheetCreateResponse = CreateDataResponse;
export type JobSheetUpdateResponse = UpdateDataResponse;
export type JobSheetRemoveResponse = RemoveDataResponse;
export type JobSheetFindResponse = DataResponse<JobSheet[]>;
export type JobSheetFindIdResponse = DataResponse<JobSheet | undefined>;
export type JobSheetPageResponse = Pagination<JobSheet>;
