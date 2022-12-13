import { createURLSearchParams, FetchApi, getFetchApi, RestOptions } from "@deboxsoft/module-client";
import { Container, DataResponse, getLogger, Logger, Pagination, PaginationOptions } from "@deboxsoft/module-core";
import {
  Student,
  StudentInput,
  StudentError,
  StudentUpdateInput,
  StudentFilter,
  StudentCreateResponse,
  StudentUpdateResponse,
  StudentRemoveResponse,
  STUDENT_SERVICE_KEY,
  StudentService,
  getModuleApiRoute
} from "@deboxsoft/lms-api";

type StudentServiceRestOptions = RestOptions;
export const createStudentServiceRest = (opts: StudentServiceRestOptions) => {
  const studentServiceRest = new StudentServiceRest(opts);
  Container.set(STUDENT_SERVICE_KEY, studentServiceRest);
  return studentServiceRest;
};

class StudentServiceRest implements StudentService {
  private readonly fetchApi: FetchApi;
  private readonly logger: Logger;
  private readonly apiPath: string;

  constructor({ fetchApi }: StudentServiceRestOptions) {
    this.logger = getLogger();
    this.apiPath = getModuleApiRoute().studentRoute;
    this.fetchApi = fetchApi || getFetchApi();
  }

  async create(input: StudentInput): Promise<StudentCreateResponse> {
    try {
      const response = await this.fetchApi.post(this.apiPath, {
        json: input
      });
      if (!response.ok) {
        throw new StudentError({ message: response.statusText });
      }
      return response.json<StudentCreateResponse>();
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  async update(id: string, input: StudentUpdateInput): Promise<StudentUpdateResponse> {
    const response = await this.fetchApi.put(`${this.apiPath}/${id}`, { json: input });
    if (!response.ok) {
      throw new StudentError({ message: response.statusText });
    }
    return response.json<StudentUpdateResponse>();
  }

  async remove(id: string): Promise<StudentRemoveResponse> {
    const response = await this.fetchApi.delete(`${this.apiPath}/${id}`);
    if (!response.ok) {
      throw new StudentError({ message: response.statusText });
    }

    return response.json<StudentRemoveResponse>();
  }

  // @ts-ignore
  async find(filter: StudentFilter = {}): Promise<Student[]> {
    try {
      const searchParams = createURLSearchParams(filter);
      const response = await this.fetchApi.get(this.apiPath, {
        searchParams
      });
      if (!response.ok) {
        throw new StudentError({ message: response.statusText });
      }
      return response.json<DataResponse<Student[]>>().then((_) => _.data);
    } catch (e) {
      this.logger.debug("error find");
      this.logger.error(e.message);
      throw e;
    }
  }

  async findById(id: string): Promise<Student | undefined> {
    const response = await this.fetchApi.get(`${this.apiPath}/${id}`, {});
    if (!response.ok) {
      throw new StudentError({ message: response.statusText });
    }
    return response.json<DataResponse<Student | undefined>>().then((_) => _.data);
  }

  async findPage(filter: PaginationOptions<StudentFilter>): Promise<Pagination<Student>> {
    const response = await this.fetchApi.post(`${this.apiPath}/page`, {
      json: filter
    });
    if (!response.ok) {
      throw new StudentError({ message: response.statusText });
    }
    return response.json<Pagination<Student>>();
  }
}
