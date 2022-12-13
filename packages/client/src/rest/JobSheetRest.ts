import { createURLSearchParams, FetchApi, getFetchApi, RestOptions } from "@deboxsoft/module-client";
import { Container, DataResponse, getLogger, Logger, Pagination, PaginationOptions } from "@deboxsoft/module-core";
import {
  JobSheet,
  JobSheetInput,
  JobSheetError,
  JobSheetUpdateInput,
  JobSheetFilter,
  JobSheetCreateResponse,
  JobSheetUpdateResponse,
  JobSheetRemoveResponse,
  JOB_SHEET_SERVICE_KEY,
  JobSheetService,
  getModuleApiRoute
} from "@deboxsoft/lms-api";

type JobSheetServiceRestOptions = RestOptions;
export const createJobSheetServiceRest = (opts: JobSheetServiceRestOptions) => {
  const jobSheetServiceRest = new JobSheetServiceRest(opts);
  Container.set(JOB_SHEET_SERVICE_KEY, jobSheetServiceRest);
  return jobSheetServiceRest;
};

class JobSheetServiceRest implements JobSheetService {
  private readonly fetchApi: FetchApi;
  private readonly logger: Logger;
  private readonly apiPath: string;

  constructor({ fetchApi }: JobSheetServiceRestOptions) {
    this.logger = getLogger();
    this.apiPath = getModuleApiRoute().jobSheetRoute;
    this.fetchApi = fetchApi || getFetchApi();
  }

  async create(input: JobSheetInput): Promise<JobSheetCreateResponse> {
    try {
      const response = await this.fetchApi.post(this.apiPath, {
        json: input
      });
      if (!response.ok) {
        throw new JobSheetError({ message: response.statusText });
      }
      return response.json<JobSheetCreateResponse>();
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  async update(id: string, input: JobSheetUpdateInput): Promise<JobSheetUpdateResponse> {
    const response = await this.fetchApi.put(`${this.apiPath}/${id}`, { json: input });
    if (!response.ok) {
      throw new JobSheetError({ message: response.statusText });
    }
    return response.json<JobSheetUpdateResponse>();
  }

  async remove(id: string): Promise<JobSheetRemoveResponse> {
    const response = await this.fetchApi.delete(`${this.apiPath}/${id}`);
    if (!response.ok) {
      throw new JobSheetError({ message: response.statusText });
    }

    return response.json<JobSheetRemoveResponse>();
  }

  // @ts-ignore
  async find(filter: JobSheetFilter = {}): Promise<JobSheet[]> {
    try {
      const searchParams = createURLSearchParams(filter);
      const response = await this.fetchApi.get(this.apiPath, {
        searchParams
      });
      if (!response.ok) {
        throw new JobSheetError({ message: response.statusText });
      }
      return response.json<DataResponse<JobSheet[]>>().then((_) => _.data);
    } catch (e) {
      this.logger.debug("error find");
      this.logger.error(e.message);
      throw e;
    }
  }

  async findById(id: string): Promise<JobSheet | undefined> {
    const response = await this.fetchApi.get(`${this.apiPath}/${id}`, {});
    if (!response.ok) {
      throw new JobSheetError({ message: response.statusText });
    }
    return response.json<DataResponse<JobSheet | undefined>>().then((_) => _.data);
  }

  async findPage(filter: PaginationOptions<JobSheetFilter>): Promise<Pagination<JobSheet>> {
    const response = await this.fetchApi.post(`${this.apiPath}/page`, {
      json: filter
    });
    if (!response.ok) {
      throw new JobSheetError({ message: response.statusText });
    }
    return response.json<Pagination<JobSheet>>();
  }
}
