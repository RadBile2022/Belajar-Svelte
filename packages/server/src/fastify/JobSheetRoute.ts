import { IdParams, DataResponse, Pagination, PaginationOptions, getLogger } from "@deboxsoft/module-core";
import {
  JobSheetFilter,
  JobSheetInput,
  JobSheetCreateResponse,
  JobSheetUpdateResponse,
  JobSheetUpdateInput,
  JobSheet,
  JobSheetRemoveResponse,
  getJobSheetService,
  getModuleApiRoute
} from "@deboxsoft/lms-api";
import { FastifyInstance } from "fastify";
import { LmsPoltekServerApiOptions } from "./types.js";
import { JobSheetServiceServer } from "../services/index.js";

export const createJobSheetRoute = (route: FastifyInstance<any>, options: LmsPoltekServerApiOptions) => {
  const jobSheetService = getJobSheetService<JobSheetServiceServer>();
  const apiPath = `/${options.apiPath}/${getModuleApiRoute().jobSheetRoute}`;
  const logger = getLogger();
  logger.debug(`create route '${apiPath}'`);
  route.post(apiPath, {}, async (request, reply): Promise<JobSheetCreateResponse | void> => {
    try {
      const input = request.body as JobSheetInput;
      logger.debug("createJobSheet %o", input);
      return await jobSheetService.create(input);
    } catch (e) {
      logger.debug(`[ERROR] createJobSheet: %o`, e);
      reply.expectationFailed(e?.message);
    }
  });
  route.put(`${apiPath}/:id`, {}, async (request, reply): Promise<JobSheetUpdateResponse | void> => {
    try {
      const { id } = request.params as IdParams;
      const input = request.body as JobSheetUpdateInput;
      logger.debug("updateJobSheet id %s", id);
      return await jobSheetService.update(id, input);
    } catch (e) {
      logger.debug("[Error] updateJobSheet %o", e);
      reply.expectationFailed(e?.message);
    }
  });
  route.delete(`${apiPath}/:id`, {}, async (request, reply): Promise<JobSheetRemoveResponse | void> => {
    try {
      const { id } = request.params as IdParams;
      logger.debug("removeJobSheet %s", id);
      return await jobSheetService.remove(id);
    } catch (e) {
      logger.debug("[ERROR] removeJobSheet %o", e);
      reply.expectationFailed(e?.message);
    }
  });
  route.get(apiPath, {}, async (request, reply): Promise<DataResponse<JobSheet[]> | void> => {
    try {
      const filter = request.params as JobSheetFilter;
      logger.debug("findJobSheet '%o'", filter);
      const data = await jobSheetService.find(filter);
      return { data, meta: {} };
    } catch (e) {
      logger.debug("[ERROR] findJobSheet %o", e);
      reply.expectationFailed(e?.message);
    }
  });
  route.post(`${apiPath}/page`, {}, async (request, reply): Promise<Pagination<JobSheetFilter> | void> => {
    try {
      const opts = request.body as PaginationOptions<JobSheetFilter>;
      logger.debug("findJobSheetPage '%o'", opts);
      return await jobSheetService.findPage(opts);
    } catch (e) {
      logger.debug("[ERROR] findJobSheetPage %o", e);
      reply.expectationFailed(e?.message);
    }
  });
  route.get(`${apiPath}/:id`, {}, async (request, reply): Promise<DataResponse<JobSheet | undefined> | void> => {
    try {
      const { id } = request.params as IdParams;
      logger.debug("findJobSheetById '%s'", id);
      const jobSheet = await jobSheetService.findById(id);
      return {
        data: jobSheet,
        meta: {}
      };
    } catch (e) {
      logger.debug("[ERROR] findJobSheetById %o", e);
      reply.expectationFailed(e?.message);
    }
  });
};
