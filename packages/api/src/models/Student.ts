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

export const StudentInput = z.object({
});
export const StudentUpdateInput = StudentInput.partial();
export const StudentDataInput = StudentInput;
export const StudentData = StudentDataInput.extend({
  id: IdSchema
});

export type StudentInput = z.input<typeof StudentInput>;
export type StudentUpdateInput = z.input<typeof StudentUpdateInput>;
export type StudentDataInput = z.input<typeof StudentDataInput>;
export type StudentData = z.output<typeof StudentData>;
export type Student = StudentData;
export type StudentFilter = Filter<StudentDataInput>;
export type StudentCreateResponse = CreateDataResponse;
export type StudentUpdateResponse = UpdateDataResponse;
export type StudentRemoveResponse = RemoveDataResponse;
export type StudentFindResponse = DataResponse<Student[]>;
export type StudentFindIdResponse = DataResponse<Student | undefined>;
export type StudentPageResponse = Pagination<Student>;
