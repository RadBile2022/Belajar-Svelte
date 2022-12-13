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

export const BookInput = z.object({
});
export const BookUpdateInput = BookInput.partial();
export const BookDataInput = BookInput;
export const BookData = BookDataInput.extend({
  id: IdSchema
});

export type BookInput = z.input<typeof BookInput>;
export type BookUpdateInput = z.input<typeof BookUpdateInput>;
export type BookDataInput = z.input<typeof BookDataInput>;
export type BookData = z.output<typeof BookData>;
export type Book = BookData;
export type BookFilter = Filter<BookDataInput>;
export type BookCreateResponse = CreateDataResponse;
export type BookUpdateResponse = UpdateDataResponse;
export type BookRemoveResponse = RemoveDataResponse;
export type BookFindResponse = DataResponse<Book[]>;
export type BookFindIdResponse = DataResponse<Book | undefined>;
export type BookPageResponse = Pagination<Book>;
