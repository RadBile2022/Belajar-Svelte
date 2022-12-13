import { createURLSearchParams, FetchApi, getFetchApi, RestOptions } from "@deboxsoft/module-client";
import { Container, DataResponse, getLogger, Logger, Pagination, PaginationOptions } from "@deboxsoft/module-core";
import {
  Book,
  BookInput,
  BookError,
  BookUpdateInput,
  BookFilter,
  BookCreateResponse,
  BookUpdateResponse,
  BookRemoveResponse,
  BOOK_SERVICE_KEY,
  BookService,
  getModuleApiRoute
} from "@deboxsoft/lms-api";

type BookServiceRestOptions = RestOptions;
export const createBookServiceRest = (opts: BookServiceRestOptions) => {
  const bookServiceRest = new BookServiceRest(opts);
  Container.set(BOOK_SERVICE_KEY, bookServiceRest);
  return bookServiceRest;
};

class BookServiceRest implements BookService {
  private readonly fetchApi: FetchApi;
  private readonly logger: Logger;
  private readonly apiPath: string;

  constructor({ fetchApi }: BookServiceRestOptions) {
    this.logger = getLogger();
    this.apiPath = getModuleApiRoute().bookRoute;
    this.fetchApi = fetchApi || getFetchApi();
  }

  async create(input: BookInput): Promise<BookCreateResponse> {
    try {
      const response = await this.fetchApi.post(this.apiPath, {
        json: input
      });
      if (!response.ok) {
        throw new BookError({ message: response.statusText });
      }
      return response.json<BookCreateResponse>();
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  async update(id: string, input: BookUpdateInput): Promise<BookUpdateResponse> {
    const response = await this.fetchApi.put(`${this.apiPath}/${id}`, { json: input });
    if (!response.ok) {
      throw new BookError({ message: response.statusText });
    }
    return response.json<BookUpdateResponse>();
  }

  async remove(id: string): Promise<BookRemoveResponse> {
    const response = await this.fetchApi.delete(`${this.apiPath}/${id}`);
    if (!response.ok) {
      throw new BookError({ message: response.statusText });
    }

    return response.json<BookRemoveResponse>();
  }

  // @ts-ignore
  async find(filter: BookFilter = {}): Promise<Book[]> {
    try {
      const searchParams = createURLSearchParams(filter);
      const response = await this.fetchApi.get(this.apiPath, {
        searchParams
      });
      if (!response.ok) {
        throw new BookError({ message: response.statusText });
      }
      return response.json<DataResponse<Book[]>>().then((_) => _.data);
    } catch (e) {
      this.logger.debug("error find");
      this.logger.error(e.message);
      throw e;
    }
  }

  async findById(id: string): Promise<Book | undefined> {
    const response = await this.fetchApi.get(`${this.apiPath}/${id}`, {});
    if (!response.ok) {
      throw new BookError({ message: response.statusText });
    }
    return response.json<DataResponse<Book | undefined>>().then((_) => _.data);
  }

  async findPage(filter: PaginationOptions<BookFilter>): Promise<Pagination<Book>> {
    const response = await this.fetchApi.post(`${this.apiPath}/page`, {
      json: filter
    });
    if (!response.ok) {
      throw new BookError({ message: response.statusText });
    }
    return response.json<Pagination<Book>>();
  }
}
