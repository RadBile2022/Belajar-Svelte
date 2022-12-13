import { IdParams, DataResponse, Pagination, PaginationOptions, getLogger } from "@deboxsoft/module-core";
import {
  StudentFilter,
  StudentInput,
  StudentCreateResponse,
  StudentUpdateResponse,
  StudentUpdateInput,
  Student,
  StudentRemoveResponse,
  getStudentService,
  getModuleApiRoute
} from "@deboxsoft/lms-api";
import { FastifyInstance } from "fastify";
import { LmsPoltekServerApiOptions } from "./types.js";
import { StudentServiceServer } from "../services/index.js";

export const createStudentRoute = (route: FastifyInstance<any>, options: LmsPoltekServerApiOptions) => {
  const studentService = getStudentService<StudentServiceServer>();
  const apiPath = `/${options.apiPath}/${getModuleApiRoute().studentRoute}`;
  const logger = getLogger();
  logger.debug(`create route '${apiPath}'`);
  route.post(apiPath, {}, async (request, reply): Promise<StudentCreateResponse | void> => {
    try {
      const input = request.body as StudentInput;
      logger.debug("createStudent %o", input);
      return await studentService.create(input);
    } catch (e) {
      logger.debug(`[ERROR] createStudent: %o`, e);
      reply.expectationFailed(e?.message);
    }
  });
  route.put(`${apiPath}/:id`, {}, async (request, reply): Promise<StudentUpdateResponse | void> => {
    try {
      const { id } = request.params as IdParams;
      const input = request.body as StudentUpdateInput;
      logger.debug("updateStudent id %s", id);
      return await studentService.update(id, input);
    } catch (e) {
      logger.debug("[Error] updateStudent %o", e);
      reply.expectationFailed(e?.message);
    }
  });
  route.delete(`${apiPath}/:id`, {}, async (request, reply): Promise<StudentRemoveResponse | void> => {
    try {
      const { id } = request.params as IdParams;
      logger.debug("removeStudent %s", id);
      return await studentService.remove(id);
    } catch (e) {
      logger.debug("[ERROR] removeStudent %o", e);
      reply.expectationFailed(e?.message);
    }
  });
  route.get(apiPath, {}, async (request, reply): Promise<DataResponse<Student[]> | void> => {
    try {
      const filter = request.params as StudentFilter;
      logger.debug("findStudent '%o'", filter);
      const data = await studentService.find(filter);
      return { data, meta: {} };
    } catch (e) {
      logger.debug("[ERROR] findStudent %o", e);
      reply.expectationFailed(e?.message);
    }
  });
  route.post(`${apiPath}/page`, {}, async (request, reply): Promise<Pagination<StudentFilter> | void> => {
    try {
      const opts = request.body as PaginationOptions<StudentFilter>;
      logger.debug("findStudentPage '%o'", opts);
      return await studentService.findPage(opts);
    } catch (e) {
      logger.debug("[ERROR] findStudentPage %o", e);
      reply.expectationFailed(e?.message);
    }
  });
  route.get(`${apiPath}/:id`, {}, async (request, reply): Promise<DataResponse<Student | undefined> | void> => {
    try {
      const { id } = request.params as IdParams;
      logger.debug("findStudentById '%s'", id);
      const student = await studentService.findById(id);
      return {
        data: student,
        meta: {}
      };
    } catch (e) {
      logger.debug("[ERROR] findStudentById %o", e);
      reply.expectationFailed(e?.message);
    }
  });
};
