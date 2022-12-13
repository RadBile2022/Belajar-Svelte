import { createURLSearchParams, FetchApi, getFetchApi, RestOptions } from "@deboxsoft/module-client";
import { Container, DataResponse, getLogger, Logger, Pagination, PaginationOptions } from "@deboxsoft/module-core";
import {
  Instructor,
  InstructorInput,
  InstructorError,
  InstructorUpdateInput,
  InstructorFilter,
  InstructorCreateResponse,
  InstructorUpdateResponse,
  InstructorRemoveResponse,
  INSTRUCTOR_SERVICE_KEY,
  InstructorService,
  getModuleApiRoute
} from "@deboxsoft/lms-api";

type InstructorServiceRestOptions = RestOptions;
export const createInstructorServiceRest = (opts: InstructorServiceRestOptions) => {
  const instructorServiceRest = new InstructorServiceRest(opts);
  Container.set(INSTRUCTOR_SERVICE_KEY, instructorServiceRest);
  return instructorServiceRest;
};

class InstructorServiceRest implements InstructorService {
  private readonly fetchApi: FetchApi;
  private readonly logger: Logger;
  private readonly apiPath: string;

  constructor({ fetchApi }: InstructorServiceRestOptions) {
    this.logger = getLogger();
    this.apiPath = getModuleApiRoute().instructorRoute;
    this.fetchApi = fetchApi || getFetchApi();
  }

  async create(input: InstructorInput): Promise<InstructorCreateResponse> {
    try {
      const response = await this.fetchApi.post(this.apiPath, {
        json: input
      });
      if (!response.ok) {
        throw new InstructorError({ message: response.statusText });
      }
      return response.json<InstructorCreateResponse>();
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  async update(id: string, input: InstructorUpdateInput): Promise<InstructorUpdateResponse> {
    const response = await this.fetchApi.put(`${this.apiPath}/${id}`, { json: input });
    if (!response.ok) {
      throw new InstructorError({ message: response.statusText });
    }
    return response.json<InstructorUpdateResponse>();
  }

  async remove(id: string): Promise<InstructorRemoveResponse> {
    const response = await this.fetchApi.delete(`${this.apiPath}/${id}`);
    if (!response.ok) {
      throw new InstructorError({ message: response.statusText });
    }

    return response.json<InstructorRemoveResponse>();
  }

  // @ts-ignore
  async find(filter: InstructorFilter = {}): Promise<Instructor[]> {
    try {
      const searchParams = createURLSearchParams(filter);
      const response = await this.fetchApi.get(this.apiPath, {
        searchParams
      });
      if (!response.ok) {
        throw new InstructorError({ message: response.statusText });
      }
      return response.json<DataResponse<Instructor[]>>().then((_) => _.data);
    } catch (e) {
      this.logger.debug("error find");
      this.logger.error(e.message);
      throw e;
    }
  }

  async findById(id: string): Promise<Instructor | undefined> {
    const response = await this.fetchApi.get(`${this.apiPath}/${id}`, {});
    if (!response.ok) {
      throw new InstructorError({ message: response.statusText });
    }
    return response.json<DataResponse<Instructor | undefined>>().then((_) => _.data);
  }

  async findPage(filter: PaginationOptions<InstructorFilter>): Promise<Pagination<Instructor>> {
    const response = await this.fetchApi.post(`${this.apiPath}/page`, {
      json: filter
    });
    if (!response.ok) {
      throw new InstructorError({ message: response.statusText });
    }
    return response.json<Pagination<Instructor>>();
  }
}
