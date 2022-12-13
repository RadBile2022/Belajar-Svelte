import { createURLSearchParams, FetchApi, getFetchApi, RestOptions } from "@deboxsoft/module-client";
import { Container, DataResponse, getLogger, Logger, Pagination, PaginationOptions } from "@deboxsoft/module-core";
import {
  Enrollment,
  EnrollmentInput,
  EnrollmentError,
  EnrollmentUpdateInput,
  EnrollmentFilter,
  EnrollmentCreateResponse,
  EnrollmentUpdateResponse,
  EnrollmentRemoveResponse,
  ENROLLMENT_SERVICE_KEY,
  EnrollmentService,
  getModuleApiRoute
} from "@deboxsoft/lms-api";

type EnrollmentServiceRestOptions = RestOptions;
export const createEnrollmentServiceRest = (opts: EnrollmentServiceRestOptions) => {
  const enrollmentServiceRest = new EnrollmentServiceRest(opts);
  Container.set(ENROLLMENT_SERVICE_KEY, enrollmentServiceRest);
  return enrollmentServiceRest;
};

class EnrollmentServiceRest implements EnrollmentService {
  private readonly fetchApi: FetchApi;
  private readonly logger: Logger;
  private readonly apiPath: string;

  constructor({ fetchApi }: EnrollmentServiceRestOptions) {
    this.logger = getLogger();
    this.apiPath = getModuleApiRoute().enrollmentRoute;
    this.fetchApi = fetchApi || getFetchApi();
  }

  async create(input: EnrollmentInput): Promise<EnrollmentCreateResponse> {
    try {
      const response = await this.fetchApi.post(this.apiPath, {
        json: input
      });
      if (!response.ok) {
        throw new EnrollmentError({ message: response.statusText });
      }
      return response.json<EnrollmentCreateResponse>();
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  async update(id: string, input: EnrollmentUpdateInput): Promise<EnrollmentUpdateResponse> {
    const response = await this.fetchApi.put(`${this.apiPath}/${id}`, { json: input });
    if (!response.ok) {
      throw new EnrollmentError({ message: response.statusText });
    }
    return response.json<EnrollmentUpdateResponse>();
  }

  async remove(id: string): Promise<EnrollmentRemoveResponse> {
    const response = await this.fetchApi.delete(`${this.apiPath}/${id}`);
    if (!response.ok) {
      throw new EnrollmentError({ message: response.statusText });
    }

    return response.json<EnrollmentRemoveResponse>();
  }

  // @ts-ignore
  async find(filter: EnrollmentFilter = {}): Promise<Enrollment[]> {
    try {
      const searchParams = createURLSearchParams(filter);
      const response = await this.fetchApi.get(this.apiPath, {
        searchParams
      });
      if (!response.ok) {
        throw new EnrollmentError({ message: response.statusText });
      }
      return response.json<DataResponse<Enrollment[]>>().then((_) => _.data);
    } catch (e) {
      this.logger.debug("error find");
      this.logger.error(e.message);
      throw e;
    }
  }

  async findById(id: string): Promise<Enrollment | undefined> {
    const response = await this.fetchApi.get(`${this.apiPath}/${id}`, {});
    if (!response.ok) {
      throw new EnrollmentError({ message: response.statusText });
    }
    return response.json<DataResponse<Enrollment | undefined>>().then((_) => _.data);
  }

  async findPage(filter: PaginationOptions<EnrollmentFilter>): Promise<Pagination<Enrollment>> {
    const response = await this.fetchApi.post(`${this.apiPath}/page`, {
      json: filter
    });
    if (!response.ok) {
      throw new EnrollmentError({ message: response.statusText });
    }
    return response.json<Pagination<Enrollment>>();
  }
}
