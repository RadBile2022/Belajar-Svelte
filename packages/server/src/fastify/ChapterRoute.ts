import { IdParams, DataResponse, Pagination, PaginationOptions, getLogger } from "@deboxsoft/module-core";
import {
  ChapterFilter,
  ChapterInput,
  ChapterCreateResponse,
  ChapterUpdateResponse,
  ChapterUpdateInput,
  Chapter,
  ChapterRemoveResponse,
  getChapterService,
  getModuleApiRoute
} from "@deboxsoft/lms-api";
import { FastifyInstance } from "fastify";
import { LmsPoltekServerApiOptions } from "./types.js";
import { ChapterServiceServer } from "../services/index.js";

export const createChapterRoute = (route: FastifyInstance<any>, options: LmsPoltekServerApiOptions) => {
  const chapterService = getChapterService<ChapterServiceServer>();
  const apiPath = `/${options.apiPath}/${getModuleApiRoute().chapterRoute}`;
  const logger = getLogger();
  logger.debug(`create route '${apiPath}'`);
  route.post(apiPath, {}, async (request, reply): Promise<ChapterCreateResponse | void> => {
    try {
      const input = request.body as ChapterInput;
      logger.debug("createChapter %o", input);
      return await chapterService.create(input);
    } catch (e) {
      logger.debug(`[ERROR] createChapter: %o`, e);
      reply.expectationFailed(e?.message);
    }
  });
  route.put(`${apiPath}/:id`, {}, async (request, reply): Promise<ChapterUpdateResponse | void> => {
    try {
      const { id } = request.params as IdParams;
      const input = request.body as ChapterUpdateInput;
      logger.debug("updateChapter id %s", id);
      return await chapterService.update(id, input);
    } catch (e) {
      logger.debug("[Error] updateChapter %o", e);
      reply.expectationFailed(e?.message);
    }
  });
  route.delete(`${apiPath}/:id`, {}, async (request, reply): Promise<ChapterRemoveResponse | void> => {
    try {
      const { id } = request.params as IdParams;
      logger.debug("removeChapter %s", id);
      return await chapterService.remove(id);
    } catch (e) {
      logger.debug("[ERROR] removeChapter %o", e);
      reply.expectationFailed(e?.message);
    }
  });
  route.get(apiPath, {}, async (request, reply): Promise<DataResponse<Chapter[]> | void> => {
    try {
      const filter = request.params as ChapterFilter;
      logger.debug("findChapter '%o'", filter);
      const data = await chapterService.find(filter);
      return { data, meta: {} };
    } catch (e) {
      logger.debug("[ERROR] findChapter %o", e);
      reply.expectationFailed(e?.message);
    }
  });
  route.post(`${apiPath}/page`, {}, async (request, reply): Promise<Pagination<ChapterFilter> | void> => {
    try {
      const opts = request.body as PaginationOptions<ChapterFilter>;
      logger.debug("findChapterPage '%o'", opts);
      return await chapterService.findPage(opts);
    } catch (e) {
      logger.debug("[ERROR] findChapterPage %o", e);
      reply.expectationFailed(e?.message);
    }
  });
  route.get(`${apiPath}/:id`, {}, async (request, reply): Promise<DataResponse<Chapter | undefined> | void> => {
    try {
      const { id } = request.params as IdParams;
      logger.debug("findChapterById '%s'", id);
      const chapter = await chapterService.findById(id);
      return {
        data: chapter,
        meta: {}
      };
    } catch (e) {
      logger.debug("[ERROR] findChapterById %o", e);
      reply.expectationFailed(e?.message);
    }
  });
};
