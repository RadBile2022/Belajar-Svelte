import { createURLSearchParams, FetchApi, getFetchApi, RestOptions } from "@deboxsoft/module-client";
import { Container, DataResponse, getLogger, Logger, Pagination, PaginationOptions } from "@deboxsoft/module-core";
import {
  Quiz,
  QuizInput,
  QuizError,
  QuizUpdateInput,
  QuizFilter,
  QuizCreateResponse,
  QuizUpdateResponse,
  QuizRemoveResponse,
  QUIZ_SERVICE_KEY,
  QuizService,
  getModuleApiRoute
} from "@deboxsoft/lms-api";

type QuizServiceRestOptions = RestOptions;
export const createQuizServiceRest = (opts: QuizServiceRestOptions) => {
  const quizServiceRest = new QuizServiceRest(opts);
  Container.set(QUIZ_SERVICE_KEY, quizServiceRest);
  return quizServiceRest;
};

class QuizServiceRest implements QuizService {
  private readonly fetchApi: FetchApi;
  private readonly logger: Logger;
  private readonly apiPath: string;

  constructor({ fetchApi }: QuizServiceRestOptions) {
    this.logger = getLogger();
    this.apiPath = getModuleApiRoute().quizRoute;
    this.fetchApi = fetchApi || getFetchApi();
  }

  async create(input: QuizInput): Promise<QuizCreateResponse> {
    try {
      const response = await this.fetchApi.post(this.apiPath, {
        json: input
      });
      if (!response.ok) {
        throw new QuizError({ message: response.statusText });
      }
      return response.json<QuizCreateResponse>();
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  async update(id: string, input: QuizUpdateInput): Promise<QuizUpdateResponse> {
    const response = await this.fetchApi.put(`${this.apiPath}/${id}`, { json: input });
    if (!response.ok) {
      throw new QuizError({ message: response.statusText });
    }
    return response.json<QuizUpdateResponse>();
  }

  async remove(id: string): Promise<QuizRemoveResponse> {
    const response = await this.fetchApi.delete(`${this.apiPath}/${id}`);
    if (!response.ok) {
      throw new QuizError({ message: response.statusText });
    }

    return response.json<QuizRemoveResponse>();
  }

  // @ts-ignore
  async find(filter: QuizFilter = {}): Promise<Quiz[]> {
    try {
      const searchParams = createURLSearchParams(filter);
      const response = await this.fetchApi.get(this.apiPath, {
        searchParams
      });
      if (!response.ok) {
        throw new QuizError({ message: response.statusText });
      }
      return response.json<DataResponse<Quiz[]>>().then((_) => _.data);
    } catch (e) {
      this.logger.debug("error find");
      this.logger.error(e.message);
      throw e;
    }
  }

  async findById(id: string): Promise<Quiz | undefined> {
    const response = await this.fetchApi.get(`${this.apiPath}/${id}`, {});
    if (!response.ok) {
      throw new QuizError({ message: response.statusText });
    }
    return response.json<DataResponse<Quiz | undefined>>().then((_) => _.data);
  }

  async findPage(filter: PaginationOptions<QuizFilter>): Promise<Pagination<Quiz>> {
    const response = await this.fetchApi.post(`${this.apiPath}/page`, {
      json: filter
    });
    if (!response.ok) {
      throw new QuizError({ message: response.statusText });
    }
    return response.json<Pagination<Quiz>>();
  }
}
