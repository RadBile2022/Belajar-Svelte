import {
  Chapter,
  ChapterCreateResponse,
  ChapterFilter,
  ChapterInput,
  ChapterRemoveResponse,
  ChapterUpdateInput,
  ChapterUpdateResponse
} from "../models/index.js";
import { Container, Pagination, PaginationOptions } from "@deboxsoft/module-core";

export const ChapterEvent = {
  onBeforeCreate: "CHAPTER-BEFORE-CREATE",
  onAfterCreate: "CHAPTER-AFTER-CREATE",
  onBeforeUpdate: "CHAPTER-BEFORE-UPDATE",
  onAfterUpdate: "CHAPTER-AFTER-UPDATE-EVENT",
  onBeforeRemove: "CHAPTER-BEFORE-REMOVE-EVENT",
  onAfterRemove: "CHAPTER-AFTER-REMOVE-EVENT"
};
export const CHAPTER_SERVICE_KEY = "CHAPTER-SERVICE-KEY";
export const getChapterService = <S extends ChapterService = ChapterService>() => Container.get<S>(CHAPTER_SERVICE_KEY);
export const hasChapterService = () => Container.has(CHAPTER_SERVICE_KEY);
export interface ChapterService {
  create(input: ChapterInput): Promise<ChapterCreateResponse>;
  update(id: string, input: ChapterUpdateInput): Promise<ChapterUpdateResponse>;
  remove(id: string): Promise<ChapterRemoveResponse>;
  findById(id: string): Promise<Chapter | undefined>;
  find(filter?: Record<string, any>): Promise<Chapter[]>;
  findPage(options?: PaginationOptions<ChapterFilter>): Promise<Pagination<Chapter>>;
}
