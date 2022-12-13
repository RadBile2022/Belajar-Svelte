import { IdParams, DataResponse, Pagination, PaginationOptions, getLogger } from "@deboxsoft/module-core";
import {
  InstructorFilter,
  InstructorInput,
  InstructorCreateResponse,
  InstructorUpdateResponse,
  InstructorUpdateInput,
  Instructor,
  InstructorRemoveResponse,
  getInstructorService,
  getModuleApiRoute
} from "@deboxsoft/lms-api";
import { FastifyInstance } from "fastify";
import { LmsPoltekServerApiOptions } from "./types.js";
import { InstructorServiceServer } from "../services/index.js";

export const createInstructorRoute = (route: FastifyInstance<any>, options: LmsPoltekServerApiOptions) => {
  const instructorService = getInstructorService<InstructorServiceServer>();
  const apiPath = `/${options.apiPath}/${getModuleApiRoute().instructorRoute}`;
  const logger = getLogger();
  logger.debug(`create route '${apiPath}'`);
  route.post(apiPath, {}, async (request, reply): Promise<InstructorCreateResponse | void> => {
    try {
      const input = request.body as InstructorInput;
      logger.debug("createInstructor %o", input);
      return await instructorService.create(input);
    } catch (e) {
      logger.debug(`[ERROR] createInstructor: %o`, e);
      reply.expectationFailed(e?.message);
    }
  });
  route.put(`${apiPath}/:id`, {}, async (request, reply): Promise<InstructorUpdateResponse | void> => {
    try {
      const { id } = request.params as IdParams;
      const input = request.body as InstructorUpdateInput;
      logger.debug("updateInstructor id %s", id);
      return await instructorService.update(id, input);
    } catch (e) {
      logger.debug("[Error] updateInstructor %o", e);
      reply.expectationFailed(e?.message);
    }
  });
  route.delete(`${apiPath}/:id`, {}, async (request, reply): Promise<InstructorRemoveResponse | void> => {
    try {
      const { id } = request.params as IdParams;
      logger.debug("removeInstructor %s", id);
      return await instructorService.remove(id);
    } catch (e) {
      logger.debug("[ERROR] removeInstructor %o", e);
      reply.expectationFailed(e?.message);
    }
  });
  route.get(apiPath, {}, async (request, reply): Promise<DataResponse<Instructor[]> | void> => {
    try {
      const filter = request.params as InstructorFilter;
      logger.debug("findInstructor '%o'", filter);
      const data = await instructorService.find(filter);
      return { data, meta: {} };
    } catch (e) {
      logger.debug("[ERROR] findInstructor %o", e);
      reply.expectationFailed(e?.message);
    }
  });
  route.post(`${apiPath}/page`, {}, async (request, reply): Promise<Pagination<InstructorFilter> | void> => {
    try {
      const opts = request.body as PaginationOptions<InstructorFilter>;
      logger.debug("findInstructorPage '%o'", opts);
      return await instructorService.findPage(opts);
    } catch (e) {
      logger.debug("[ERROR] findInstructorPage %o", e);
      reply.expectationFailed(e?.message);
    }
  });
  route.get(`${apiPath}/:id`, {}, async (request, reply): Promise<DataResponse<Instructor | undefined> | void> => {
    try {
      const { id } = request.params as IdParams;
      logger.debug("findInstructorById '%s'", id);
      const instructor = await instructorService.findById(id);
      return {
        data: instructor,
        meta: {}
      };
    } catch (e) {
      logger.debug("[ERROR] findInstructorById %o", e);
      reply.expectationFailed(e?.message);
    }
  });
};
