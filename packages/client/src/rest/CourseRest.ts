import { createURLSearchParams, FetchApi, getFetchApi, RestOptions } from "@deboxsoft/module-client";
import { Container, DataResponse, getLogger, Logger, Pagination, PaginationOptions } from "@deboxsoft/module-core";
import {
  Course,
  CourseInput,
  CourseError,
  CourseUpdateInput,
  CourseFilter,
  CourseCreateResponse,
  CourseUpdateResponse,
  CourseRemoveResponse,
  COURSE_SERVICE_KEY,
  CourseService,
  getModuleApiRoute
} from "@deboxsoft/lms-api";

type CourseServiceRestOptions = RestOptions;
export const createCourseServiceRest = (opts: CourseServiceRestOptions) => {
  const courseServiceRest = new CourseServiceRest(opts);
  Container.set(COURSE_SERVICE_KEY, courseServiceRest);
  return courseServiceRest;
};

class CourseServiceRest implements CourseService {
  private readonly fetchApi: FetchApi;
  private readonly logger: Logger;
  private readonly apiPath: string;

  constructor({ fetchApi }: CourseServiceRestOptions) {
    this.logger = getLogger();
    this.apiPath = getModuleApiRoute().courseRoute;
    this.fetchApi = fetchApi || getFetchApi();
  }

  async create(input: CourseInput): Promise<CourseCreateResponse> {
    try {
      const response = await this.fetchApi.post(this.apiPath, {
        json: input
      });
      if (!response.ok) {
        throw new CourseError({ message: response.statusText });
      }
      return response.json<CourseCreateResponse>();
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  async update(id: string, input: CourseUpdateInput): Promise<CourseUpdateResponse> {
    const response = await this.fetchApi.put(`${this.apiPath}/${id}`, { json: input });
    if (!response.ok) {
      throw new CourseError({ message: response.statusText });
    }
    return response.json<CourseUpdateResponse>();
  }

  async remove(id: string): Promise<CourseRemoveResponse> {
    const response = await this.fetchApi.delete(`${this.apiPath}/${id}`);
    if (!response.ok) {
      throw new CourseError({ message: response.statusText });
    }

    return response.json<CourseRemoveResponse>();
  }

  // @ts-ignore
  async find(filter: CourseFilter = {}): Promise<Course[]> {
    try {
      const searchParams = createURLSearchParams(filter);
      const response = await this.fetchApi.get(this.apiPath, {
        searchParams
      });
      if (!response.ok) {
        throw new CourseError({ message: response.statusText });
      }
      return response.json<DataResponse<Course[]>>().then((_) => _.data);
    } catch (e) {
      this.logger.debug("error find");
      this.logger.error(e.message);
      throw e;
    }
  }

  async findById(id: string): Promise<Course | undefined> {
    const response = await this.fetchApi.get(`${this.apiPath}/${id}`, {});
    if (!response.ok) {
      throw new CourseError({ message: response.statusText });
    }
    return response.json<DataResponse<Course | undefined>>().then((_) => _.data);
  }

  async findPage(filter: PaginationOptions<CourseFilter>): Promise<Pagination<Course>> {
    const response = await this.fetchApi.post(`${this.apiPath}/page`, {
      json: filter
    });
    if (!response.ok) {
      throw new CourseError({ message: response.statusText });
    }
    return response.json<Pagination<Course>>();
  }
}
