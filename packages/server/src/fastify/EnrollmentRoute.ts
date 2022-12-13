import { IdParams, DataResponse, Pagination, PaginationOptions, getLogger } from "@deboxsoft/module-core";
import {
  EnrollmentFilter,
  EnrollmentInput,
  EnrollmentCreateResponse,
  EnrollmentUpdateResponse,
  EnrollmentUpdateInput,
  Enrollment,
  EnrollmentRemoveResponse,
  getEnrollmentService,
  getModuleApiRoute
} from "@deboxsoft/lms-api";
import { FastifyInstance } from "fastify";
import { LmsPoltekServerApiOptions } from "./types.js";
import { EnrollmentServiceServer } from "../services/index.js";

export const createEnrollmentRoute = (route: FastifyInstance<any>, options: LmsPoltekServerApiOptions) => {
  const enrollmentService = getEnrollmentService<EnrollmentServiceServer>();
  const apiPath = `/${options.apiPath}/${getModuleApiRoute().enrollmentRoute}`;
  const logger = getLogger();
  logger.debug(`create route '${apiPath}'`);
  route.post(apiPath, {}, async (request, reply): Promise<EnrollmentCreateResponse | void> => {
    try {
      const input = request.body as EnrollmentInput;
      logger.debug("createEnrollment %o", input);
      return await enrollmentService.create(input);
    } catch (e) {
      logger.debug(`[ERROR] createEnrollment: %o`, e);
      reply.expectationFailed(e?.message);
    }
  });
  route.put(`${apiPath}/:id`, {}, async (request, reply): Promise<EnrollmentUpdateResponse | void> => {
    try {
      const { id } = request.params as IdParams;
      const input = request.body as EnrollmentUpdateInput;
      logger.debug("updateEnrollment id %s", id);
      return await enrollmentService.update(id, input);
    } catch (e) {
      logger.debug("[Error] updateEnrollment %o", e);
      reply.expectationFailed(e?.message);
    }
  });
  route.delete(`${apiPath}/:id`, {}, async (request, reply): Promise<EnrollmentRemoveResponse | void> => {
    try {
      const { id } = request.params as IdParams;
      logger.debug("removeEnrollment %s", id);
      return await enrollmentService.remove(id);
    } catch (e) {
      logger.debug("[ERROR] removeEnrollment %o", e);
      reply.expectationFailed(e?.message);
    }
  });
  route.get(apiPath, {}, async (request, reply): Promise<DataResponse<Enrollment[]> | void> => {
    try {
      const filter = request.params as EnrollmentFilter;
      logger.debug("findEnrollment '%o'", filter);
      const data = await enrollmentService.find(filter);
      return { data, meta: {} };
    } catch (e) {
      logger.debug("[ERROR] findEnrollment %o", e);
      reply.expectationFailed(e?.message);
    }
  });
  route.post(`${apiPath}/page`, {}, async (request, reply): Promise<Pagination<EnrollmentFilter> | void> => {
    try {
      const opts = request.body as PaginationOptions<EnrollmentFilter>;
      logger.debug("findEnrollmentPage '%o'", opts);
      return await enrollmentService.findPage(opts);
    } catch (e) {
      logger.debug("[ERROR] findEnrollmentPage %o", e);
      reply.expectationFailed(e?.message);
    }
  });
  route.get(`${apiPath}/:id`, {}, async (request, reply): Promise<DataResponse<Enrollment | undefined> | void> => {
    try {
      const { id } = request.params as IdParams;
      logger.debug("findEnrollmentById '%s'", id);
      const enrollment = await enrollmentService.findById(id);
      return {
        data: enrollment,
        meta: {}
      };
    } catch (e) {
      logger.debug("[ERROR] findEnrollmentById %o", e);
      reply.expectationFailed(e?.message);
    }
  });
};
