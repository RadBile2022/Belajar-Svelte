import {
  Student,
  StudentCreateResponse,
  StudentFilter,
  StudentInput,
  StudentRemoveResponse,
  StudentUpdateInput,
  StudentUpdateResponse
} from "../models/index.js";
import { Container, Pagination, PaginationOptions } from "@deboxsoft/module-core";

export const StudentEvent = {
  onBeforeCreate: "STUDENT-BEFORE-CREATE",
  onAfterCreate: "STUDENT-AFTER-CREATE",
  onBeforeUpdate: "STUDENT-BEFORE-UPDATE",
  onAfterUpdate: "STUDENT-AFTER-UPDATE-EVENT",
  onBeforeRemove: "STUDENT-BEFORE-REMOVE-EVENT",
  onAfterRemove: "STUDENT-AFTER-REMOVE-EVENT"
};
export const STUDENT_SERVICE_KEY = "STUDENT-SERVICE-KEY";
export const getStudentService = <S extends StudentService = StudentService>() => Container.get<S>(STUDENT_SERVICE_KEY);
export const hasStudentService = () => Container.has(STUDENT_SERVICE_KEY);
export interface StudentService {
  create(input: StudentInput): Promise<StudentCreateResponse>;
  update(id: string, input: StudentUpdateInput): Promise<StudentUpdateResponse>;
  remove(id: string): Promise<StudentRemoveResponse>;
  findById(id: string): Promise<Student | undefined>;
  find(filter?: Record<string, any>): Promise<Student[]>;
  findPage(options?: PaginationOptions<StudentFilter>): Promise<Pagination<Student>>;
}
