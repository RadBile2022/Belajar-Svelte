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

export const CourseInput = z.object({
});
export const CourseUpdateInput = CourseInput.partial();
export const CourseDataInput = CourseInput;
export const CourseData = CourseDataInput.extend({
  id: IdSchema
});

export type CourseInput = z.input<typeof CourseInput>;
export type CourseUpdateInput = z.input<typeof CourseUpdateInput>;
export type CourseDataInput = z.input<typeof CourseDataInput>;
export type CourseData = z.output<typeof CourseData>;
export type Course = CourseData;
export type CourseFilter = Filter<CourseDataInput>;
export type CourseCreateResponse = CreateDataResponse;
export type CourseUpdateResponse = UpdateDataResponse;
export type CourseRemoveResponse = RemoveDataResponse;
export type CourseFindResponse = DataResponse<Course[]>;
export type CourseFindIdResponse = DataResponse<Course | undefined>;
export type CoursePageResponse = Pagination<Course>;
