import { IdParams, DataResponse, Pagination, PaginationOptions, getLogger } from "@deboxsoft/module-core";
import {
  QuizFilter,
  QuizInput,
  QuizCreateResponse,
  QuizUpdateResponse,
  QuizUpdateInput,
  Quiz,
  QuizRemoveResponse,
  getQuizService,
  getModuleApiRoute
} from "@deboxsoft/lms-api";
import { FastifyInstance } from "fastify";
import { LmsPoltekServerApiOptions } from "./types.js";
import { QuizServiceServer } from "../services/index.js";

export const createQuizRoute = (route: FastifyInstance<any>, options: LmsPoltekServerApiOptions) => {
  const quizService = getQuizService<QuizServiceServer>();
  const apiPath = `/${options.apiPath}/${getModuleApiRoute().quizRoute}`;
  const logger = getLogger();
  logger.debug(`create route '${apiPath}'`);
  route.post(apiPath, {}, async (request, reply): Promise<QuizCreateResponse | void> => {
    try {
      const input = request.body as QuizInput;
      logger.debug("createQuiz %o", input);
      return await quizService.create(input);
    } catch (e) {
      logger.debug(`[ERROR] createQuiz: %o`, e);
      reply.expectationFailed(e?.message);
    }
  });
  route.put(`${apiPath}/:id`, {}, async (request, reply): Promise<QuizUpdateResponse | void> => {
    try {
      const { id } = request.params as IdParams;
      const input = request.body as QuizUpdateInput;
      logger.debug("updateQuiz id %s", id);
      return await quizService.update(id, input);
    } catch (e) {
      logger.debug("[Error] updateQuiz %o", e);
      reply.expectationFailed(e?.message);
    }
  });
  route.delete(`${apiPath}/:id`, {}, async (request, reply): Promise<QuizRemoveResponse | void> => {
    try {
      const { id } = request.params as IdParams;
      logger.debug("removeQuiz %s", id);
      return await quizService.remove(id);
    } catch (e) {
      logger.debug("[ERROR] removeQuiz %o", e);
      reply.expectationFailed(e?.message);
    }
  });
  route.get(apiPath, {}, async (request, reply): Promise<DataResponse<Quiz[]> | void> => {
    try {
      const filter = request.params as QuizFilter;
      logger.debug("findQuiz '%o'", filter);
      const data = await quizService.find(filter);
      return { data, meta: {} };
    } catch (e) {
      logger.debug("[ERROR] findQuiz %o", e);
      reply.expectationFailed(e?.message);
    }
  });
  route.post(`${apiPath}/page`, {}, async (request, reply): Promise<Pagination<QuizFilter> | void> => {
    try {
      const opts = request.body as PaginationOptions<QuizFilter>;
      logger.debug("findQuizPage '%o'", opts);
      return await quizService.findPage(opts);
    } catch (e) {
      logger.debug("[ERROR] findQuizPage %o", e);
      reply.expectationFailed(e?.message);
    }
  });
  route.get(`${apiPath}/:id`, {}, async (request, reply): Promise<DataResponse<Quiz | undefined> | void> => {
    try {
      const { id } = request.params as IdParams;
      logger.debug("findQuizById '%s'", id);
      const quiz = await quizService.findById(id);
      return {
        data: quiz,
        meta: {}
      };
    } catch (e) {
      logger.debug("[ERROR] findQuizById %o", e);
      reply.expectationFailed(e?.message);
    }
  });
};
