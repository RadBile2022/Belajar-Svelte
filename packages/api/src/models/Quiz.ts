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

export const QuizInput = z.object({
});
export const QuizUpdateInput = QuizInput.partial();
export const QuizDataInput = QuizInput;
export const QuizData = QuizDataInput.extend({
  id: IdSchema
});

export type QuizInput = z.input<typeof QuizInput>;
export type QuizUpdateInput = z.input<typeof QuizUpdateInput>;
export type QuizDataInput = z.input<typeof QuizDataInput>;
export type QuizData = z.output<typeof QuizData>;
export type Quiz = QuizData;
export type QuizFilter = Filter<QuizDataInput>;
export type QuizCreateResponse = CreateDataResponse;
export type QuizUpdateResponse = UpdateDataResponse;
export type QuizRemoveResponse = RemoveDataResponse;
export type QuizFindResponse = DataResponse<Quiz[]>;
export type QuizFindIdResponse = DataResponse<Quiz | undefined>;
export type QuizPageResponse = Pagination<Quiz>;
