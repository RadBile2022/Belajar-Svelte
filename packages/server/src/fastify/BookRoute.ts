import { IdParams, DataResponse, Pagination, PaginationOptions, getLogger } from "@deboxsoft/module-core";
import {
  BookFilter,
  BookInput,
  BookCreateResponse,
  BookUpdateResponse,
  BookUpdateInput,
  Book,
  BookRemoveResponse,
  getBookService,
  getModuleApiRoute
} from "@deboxsoft/lms-api";
import { FastifyInstance } from "fastify";
import { LmsPoltekServerApiOptions } from "./types.js";
import { BookServiceServer } from "../services/index.js";

export const createBookRoute = (route: FastifyInstance<any>, options: LmsPoltekServerApiOptions) => {
  const bookService = getBookService<BookServiceServer>();
  const apiPath = `/${options.apiPath}/${getModuleApiRoute().bookRoute}`;
  const logger = getLogger();
  logger.debug(`create route '${apiPath}'`);
  route.post(apiPath, {}, async (request, reply): Promise<BookCreateResponse | void> => {
    try {
      const input = request.body as BookInput;
      logger.debug("createBook %o", input);
      return await bookService.create(input);
    } catch (e) {
      logger.debug(`[ERROR] createBook: %o`, e);
      reply.expectationFailed(e?.message);
    }
  });
  route.put(`${apiPath}/:id`, {}, async (request, reply): Promise<BookUpdateResponse | void> => {
    try {
      const { id } = request.params as IdParams;
      const input = request.body as BookUpdateInput;
      logger.debug("updateBook id %s", id);
      return await bookService.update(id, input);
    } catch (e) {
      logger.debug("[Error] updateBook %o", e);
      reply.expectationFailed(e?.message);
    }
  });
  route.delete(`${apiPath}/:id`, {}, async (request, reply): Promise<BookRemoveResponse | void> => {
    try {
      const { id } = request.params as IdParams;
      logger.debug("removeBook %s", id);
      return await bookService.remove(id);
    } catch (e) {
      logger.debug("[ERROR] removeBook %o", e);
      reply.expectationFailed(e?.message);
    }
  });
  route.get(apiPath, {}, async (request, reply): Promise<DataResponse<Book[]> | void> => {
    try {
      const filter = request.params as BookFilter;
      logger.debug("findBook '%o'", filter);
      const data = await bookService.find(filter);
      return { data, meta: {} };
    } catch (e) {
      logger.debug("[ERROR] findBook %o", e);
      reply.expectationFailed(e?.message);
    }
  });
  route.post(`${apiPath}/page`, {}, async (request, reply): Promise<Pagination<BookFilter> | void> => {
    try {
      const opts = request.body as PaginationOptions<BookFilter>;
      logger.debug("findBookPage '%o'", opts);
      return await bookService.findPage(opts);
    } catch (e) {
      logger.debug("[ERROR] findBookPage %o", e);
      reply.expectationFailed(e?.message);
    }
  });
  route.get(`${apiPath}/:id`, {}, async (request, reply): Promise<DataResponse<Book | undefined> | void> => {
    try {
      const { id } = request.params as IdParams;
      logger.debug("findBookById '%s'", id);
      const book = await bookService.findById(id);
      return {
        data: book,
        meta: {}
      };
    } catch (e) {
      logger.debug("[ERROR] findBookById %o", e);
      reply.expectationFailed(e?.message);
    }
  });
};
