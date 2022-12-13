import {
  Course,
  CourseCreateResponse,
  CourseFilter,
  CourseInput,
  CourseRemoveResponse,
  CourseUpdateInput,
  CourseUpdateResponse
} from "../models/index.js";
import { Container, Pagination, PaginationOptions } from "@deboxsoft/module-core";

export const CourseEvent = {
  onBeforeCreate: "COURSE-BEFORE-CREATE",
  onAfterCreate: "COURSE-AFTER-CREATE",
  onBeforeUpdate: "COURSE-BEFORE-UPDATE",
  onAfterUpdate: "COURSE-AFTER-UPDATE-EVENT",
  onBeforeRemove: "COURSE-BEFORE-REMOVE-EVENT",
  onAfterRemove: "COURSE-AFTER-REMOVE-EVENT"
};
export const COURSE_SERVICE_KEY = "COURSE-SERVICE-KEY";
export const getCourseService = <S extends CourseService = CourseService>() => Container.get<S>(COURSE_SERVICE_KEY);
export const hasCourseService = () => Container.has(COURSE_SERVICE_KEY);
export interface CourseService {
  create(input: CourseInput): Promise<CourseCreateResponse>;
  update(id: string, input: CourseUpdateInput): Promise<CourseUpdateResponse>;
  remove(id: string): Promise<CourseRemoveResponse>;
  findById(id: string): Promise<Course | undefined>;
  find(filter?: Record<string, any>): Promise<Course[]>;
  findPage(options?: PaginationOptions<CourseFilter>): Promise<Pagination<Course>>;
}
