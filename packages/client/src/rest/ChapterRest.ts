import { createURLSearchParams, FetchApi, getFetchApi, RestOptions } from "@deboxsoft/module-client";
import { Container, DataResponse, getLogger, Logger, Pagination, PaginationOptions } from "@deboxsoft/module-core";
import {
  Chapter,
  ChapterInput,
  ChapterError,
  ChapterUpdateInput,
  ChapterFilter,
  ChapterCreateResponse,
  ChapterUpdateResponse,
  ChapterRemoveResponse,
  CHAPTER_SERVICE_KEY,
  ChapterService,
  getModuleApiRoute
} from "@deboxsoft/lms-api";

type ChapterServiceRestOptions = RestOptions;
export const createChapterServiceRest = (opts: ChapterServiceRestOptions) => {
  const chapterServiceRest = new ChapterServiceRest(opts);
  Container.set(CHAPTER_SERVICE_KEY, chapterServiceRest);
  return chapterServiceRest;
};

class ChapterServiceRest implements ChapterService {
  private readonly fetchApi: FetchApi;
  private readonly logger: Logger;
  private readonly apiPath: string;

  constructor({ fetchApi }: ChapterServiceRestOptions) {
    this.logger = getLogger();
    this.apiPath = getModuleApiRoute().chapterRoute;
    this.fetchApi = fetchApi || getFetchApi();
  }

  async create(input: ChapterInput): Promise<ChapterCreateResponse> {
    try {
      const response = await this.fetchApi.post(this.apiPath, {
        json: input
      });
      if (!response.ok) {
        throw new ChapterError({ message: response.statusText });
      }
      return response.json<ChapterCreateResponse>();
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  async update(id: string, input: ChapterUpdateInput): Promise<ChapterUpdateResponse> {
    const response = await this.fetchApi.put(`${this.apiPath}/${id}`, { json: input });
    if (!response.ok) {
      throw new ChapterError({ message: response.statusText });
    }
    return response.json<ChapterUpdateResponse>();
  }

  async remove(id: string): Promise<ChapterRemoveResponse> {
    const response = await this.fetchApi.delete(`${this.apiPath}/${id}`);
    if (!response.ok) {
      throw new ChapterError({ message: response.statusText });
    }

    return response.json<ChapterRemoveResponse>();
  }

  // @ts-ignore
  async find(filter: ChapterFilter = {}): Promise<Chapter[]> {
    try {
      const searchParams = createURLSearchParams(filter);
      const response = await this.fetchApi.get(this.apiPath, {
        searchParams
      });
      if (!response.ok) {
        throw new ChapterError({ message: response.statusText });
      }
      return response.json<DataResponse<Chapter[]>>().then((_) => _.data);
    } catch (e) {
      this.logger.debug("error find");
      this.logger.error(e.message);
      throw e;
    }
  }

  async findById(id: string): Promise<Chapter | undefined> {
    const response = await this.fetchApi.get(`${this.apiPath}/${id}`, {});
    if (!response.ok) {
      throw new ChapterError({ message: response.statusText });
    }
    return response.json<DataResponse<Chapter | undefined>>().then((_) => _.data);
  }

  async findPage(filter: PaginationOptions<ChapterFilter>): Promise<Pagination<Chapter>> {
    const response = await this.fetchApi.post(`${this.apiPath}/page`, {
      json: filter
    });
    if (!response.ok) {
      throw new ChapterError({ message: response.statusText });
    }
    return response.json<Pagination<Chapter>>();
  }
}
