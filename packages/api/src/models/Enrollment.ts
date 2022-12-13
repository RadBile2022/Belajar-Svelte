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

export const EnrollmentInput = z.object({
});
export const EnrollmentUpdateInput = EnrollmentInput.partial();
export const EnrollmentDataInput = EnrollmentInput;
export const EnrollmentData = EnrollmentDataInput.extend({
  id: IdSchema
});

export type EnrollmentInput = z.input<typeof EnrollmentInput>;
export type EnrollmentUpdateInput = z.input<typeof EnrollmentUpdateInput>;
export type EnrollmentDataInput = z.input<typeof EnrollmentDataInput>;
export type EnrollmentData = z.output<typeof EnrollmentData>;
export type Enrollment = EnrollmentData;
export type EnrollmentFilter = Filter<EnrollmentDataInput>;
export type EnrollmentCreateResponse = CreateDataResponse;
export type EnrollmentUpdateResponse = UpdateDataResponse;
export type EnrollmentRemoveResponse = RemoveDataResponse;
export type EnrollmentFindResponse = DataResponse<Enrollment[]>;
export type EnrollmentFindIdResponse = DataResponse<Enrollment | undefined>;
export type EnrollmentPageResponse = Pagination<Enrollment>;
