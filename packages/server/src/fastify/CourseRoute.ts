import { IdParams, DataResponse, Pagination, PaginationOptions, getLogger } from "@deboxsoft/module-core";
import {
  CourseFilter,
  CourseInput,
  CourseCreateResponse,
  CourseUpdateResponse,
  CourseUpdateInput,
  Course,
  CourseRemoveResponse,
  getCourseService,
  getModuleApiRoute
} from "@deboxsoft/lms-api";
import { FastifyInstance } from "fastify";
import { LmsPoltekServerApiOptions } from "./types.js";
import { CourseServiceServer } from "../services/index.js";

export const createCourseRoute = (route: FastifyInstance<any>, options: LmsPoltekServerApiOptions) => {
  const courseService = getCourseService<CourseServiceServer>();
  const apiPath = `/${options.apiPath}/${getModuleApiRoute().courseRoute}`;
  const logger = getLogger();
  logger.debug(`create route '${apiPath}'`);
  route.post(apiPath, {}, async (request, reply): Promise<CourseCreateResponse | void> => {
    try {
      const input = request.body as CourseInput;
      logger.debug("createCourse %o", input);
      return await courseService.create(input);
    } catch (e) {
      logger.debug(`[ERROR] createCourse: %o`, e);
      reply.expectationFailed(e?.message);
    }
  });
  route.put(`${apiPath}/:id`, {}, async (request, reply): Promise<CourseUpdateResponse | void> => {
    try {
      const { id } = request.params as IdParams;
      const input = request.body as CourseUpdateInput;
      logger.debug("updateCourse id %s", id);
      return await courseService.update(id, input);
    } catch (e) {
      logger.debug("[Error] updateCourse %o", e);
      reply.expectationFailed(e?.message);
    }
  });
  route.delete(`${apiPath}/:id`, {}, async (request, reply): Promise<CourseRemoveResponse | void> => {
    try {
      const { id } = request.params as IdParams;
      logger.debug("removeCourse %s", id);
      return await courseService.remove(id);
    } catch (e) {
      logger.debug("[ERROR] removeCourse %o", e);
      reply.expectationFailed(e?.message);
    }
  });
  route.get(apiPath, {}, async (request, reply): Promise<DataResponse<Course[]> | void> => {
    try {
      const filter = request.params as CourseFilter;
      logger.debug("findCourse '%o'", filter);
      const data = await courseService.find(filter);
      return { data, meta: {} };
    } catch (e) {
      logger.debug("[ERROR] findCourse %o", e);
      reply.expectationFailed(e?.message);
    }
  });
  route.post(`${apiPath}/page`, {}, async (request, reply): Promise<Pagination<CourseFilter> | void> => {
    try {
      const opts = request.body as PaginationOptions<CourseFilter>;
      logger.debug("findCoursePage '%o'", opts);
      return await courseService.findPage(opts);
    } catch (e) {
      logger.debug("[ERROR] findCoursePage %o", e);
      reply.expectationFailed(e?.message);
    }
  });
  route.get(`${apiPath}/:id`, {}, async (request, reply): Promise<DataResponse<Course | undefined> | void> => {
    try {
      const { id } = request.params as IdParams;
      logger.debug("findCourseById '%s'", id);
      const course = await courseService.findById(id);
      return {
        data: course,
        meta: {}
      };
    } catch (e) {
      logger.debug("[ERROR] findCourseById %o", e);
      reply.expectationFailed(e?.message);
    }
  });
};
