import {
  Instructor,
  InstructorCreateResponse,
  InstructorFilter,
  InstructorInput,
  InstructorRemoveResponse,
  InstructorUpdateInput,
  InstructorUpdateResponse
} from "../models/index.js";
import { Container, Pagination, PaginationOptions } from "@deboxsoft/module-core";

export const InstructorEvent = {
  onBeforeCreate: "INSTRUCTOR-BEFORE-CREATE",
  onAfterCreate: "INSTRUCTOR-AFTER-CREATE",
  onBeforeUpdate: "INSTRUCTOR-BEFORE-UPDATE",
  onAfterUpdate: "INSTRUCTOR-AFTER-UPDATE-EVENT",
  onBeforeRemove: "INSTRUCTOR-BEFORE-REMOVE-EVENT",
  onAfterRemove: "INSTRUCTOR-AFTER-REMOVE-EVENT"
};
export const INSTRUCTOR_SERVICE_KEY = "INSTRUCTOR-SERVICE-KEY";
export const getInstructorService = <S extends InstructorService = InstructorService>() => Container.get<S>(INSTRUCTOR_SERVICE_KEY);
export const hasInstructorService = () => Container.has(INSTRUCTOR_SERVICE_KEY);
export interface InstructorService {
  create(input: InstructorInput): Promise<InstructorCreateResponse>;
  update(id: string, input: InstructorUpdateInput): Promise<InstructorUpdateResponse>;
  remove(id: string): Promise<InstructorRemoveResponse>;
  findById(id: string): Promise<Instructor | undefined>;
  find(filter?: Record<string, any>): Promise<Instructor[]>;
  findPage(options?: PaginationOptions<InstructorFilter>): Promise<Pagination<Instructor>>;
}
