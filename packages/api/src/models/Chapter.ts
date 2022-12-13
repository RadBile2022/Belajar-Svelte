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

export const ChapterInput = z.object({
});
export const ChapterUpdateInput = ChapterInput.partial();
export const ChapterDataInput = ChapterInput;
export const ChapterData = ChapterDataInput.extend({
  id: IdSchema
});

export type ChapterInput = z.input<typeof ChapterInput>;
export type ChapterUpdateInput = z.input<typeof ChapterUpdateInput>;
export type ChapterDataInput = z.input<typeof ChapterDataInput>;
export type ChapterData = z.output<typeof ChapterData>;
export type Chapter = ChapterData;
export type ChapterFilter = Filter<ChapterDataInput>;
export type ChapterCreateResponse = CreateDataResponse;
export type ChapterUpdateResponse = UpdateDataResponse;
export type ChapterRemoveResponse = RemoveDataResponse;
export type ChapterFindResponse = DataResponse<Chapter[]>;
export type ChapterFindIdResponse = DataResponse<Chapter | undefined>;
export type ChapterPageResponse = Pagination<Chapter>;
