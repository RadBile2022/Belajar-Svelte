import {
  Enrollment,
  EnrollmentCreateResponse,
  EnrollmentFilter,
  EnrollmentInput,
  EnrollmentRemoveResponse,
  EnrollmentUpdateInput,
  EnrollmentUpdateResponse
} from "../models/index.js";
import { Container, Pagination, PaginationOptions } from "@deboxsoft/module-core";

export const EnrollmentEvent = {
  onBeforeCreate: "ENROLLMENT-BEFORE-CREATE",
  onAfterCreate: "ENROLLMENT-AFTER-CREATE",
  onBeforeUpdate: "ENROLLMENT-BEFORE-UPDATE",
  onAfterUpdate: "ENROLLMENT-AFTER-UPDATE-EVENT",
  onBeforeRemove: "ENROLLMENT-BEFORE-REMOVE-EVENT",
  onAfterRemove: "ENROLLMENT-AFTER-REMOVE-EVENT"
};
export const ENROLLMENT_SERVICE_KEY = "ENROLLMENT-SERVICE-KEY";
export const getEnrollmentService = <S extends EnrollmentService = EnrollmentService>() => Container.get<S>(ENROLLMENT_SERVICE_KEY);
export const hasEnrollmentService = () => Container.has(ENROLLMENT_SERVICE_KEY);
export interface EnrollmentService {
  create(input: EnrollmentInput): Promise<EnrollmentCreateResponse>;
  update(id: string, input: EnrollmentUpdateInput): Promise<EnrollmentUpdateResponse>;
  remove(id: string): Promise<EnrollmentRemoveResponse>;
  findById(id: string): Promise<Enrollment | undefined>;
  find(filter?: Record<string, any>): Promise<Enrollment[]>;
  findPage(options?: PaginationOptions<EnrollmentFilter>): Promise<Pagination<Enrollment>>;
}
