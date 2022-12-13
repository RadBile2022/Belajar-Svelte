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

export const InstructorInput = z.object({
});
export const InstructorUpdateInput = InstructorInput.partial();
export const InstructorDataInput = InstructorInput;
export const InstructorData = InstructorDataInput.extend({
  id: IdSchema
});

export type InstructorInput = z.input<typeof InstructorInput>;
export type InstructorUpdateInput = z.input<typeof InstructorUpdateInput>;
export type InstructorDataInput = z.input<typeof InstructorDataInput>;
export type InstructorData = z.output<typeof InstructorData>;
export type Instructor = InstructorData;
export type InstructorFilter = Filter<InstructorDataInput>;
export type InstructorCreateResponse = CreateDataResponse;
export type InstructorUpdateResponse = UpdateDataResponse;
export type InstructorRemoveResponse = RemoveDataResponse;
export type InstructorFindResponse = DataResponse<Instructor[]>;
export type InstructorFindIdResponse = DataResponse<Instructor | undefined>;
export type InstructorPageResponse = Pagination<Instructor>;
