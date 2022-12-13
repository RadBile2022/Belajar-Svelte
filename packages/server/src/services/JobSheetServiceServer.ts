import { Container, getLogger, Logger, PaginationOptions } from "@deboxsoft/module-core";
import {
  JobSheetFilter,
  JobSheet,
  JobSheetError,
  JobSheetEvent,
  JobSheetInput,
  JobSheetService,
  JobSheetUpdateInput,
  JobSheetDataInput,
  JobSheetCreateResponse,
  JobSheetUpdateResponse,
  JobSheetRemoveResponse,
  JOB_SHEET_SERVICE_KEY
} from "@deboxsoft/lms-api";
import { MQEmitter } from "mqemitter";
import { getJobSheetRepo, JobSheetRepo } from "../db/index.js";
import { LmsPoltekServerModuleConfig } from "../types.js";

export const createJobSheetServiceServer = async (opts: LmsPoltekServerModuleConfig) => {
  const JobSheetRepo = getJobSheetRepo();
  const JobSheetService = new JobSheetServiceServer(JobSheetRepo, opts);
  Container.set(JOB_SHEET_SERVICE_KEY, JobSheetService);
  return JobSheetService;
};

export class JobSheetServiceServer implements JobSheetService {
  logger: Logger;
  event: MQEmitter;
  constructor(private JobSheetRepo: JobSheetRepo, { event }: LmsPoltekServerModuleConfig) {
    this.logger = getLogger();
    this.event = event;
  }

  async create(input: JobSheetInput): Promise<JobSheetCreateResponse> {
    const dataInput: JobSheetDataInput = JobSheetInput.parse(input);
    this.event.emit({ topic: JobSheetEvent.onBeforeCreate, input: dataInput });
    const { data: id } = await this.JobSheetRepo.create(dataInput);
    if (id) {
      this.JobSheetRepo.findById(id).then((_) => {
        if (_) {
          this.event.emit({ topic: JobSheetEvent.onAfterCreate, data: _ });
          return _;
        } else {
        }
      });
      return {
        data: id,
        meta: {}
      };
    }
    throw new JobSheetError({ code: "JOB_SHEET_CREATE_FAILED" });
  }

  async update(id, input: JobSheetUpdateInput): Promise<JobSheetUpdateResponse> {
    const dataInput: Partial<JobSheetDataInput> = JobSheetUpdateInput.parse(input);
    this.event.emit({ topic: JobSheetEvent.onBeforeUpdate, id, input: dataInput });
    const { data } = await this.JobSheetRepo.update(id, dataInput);
    if (data) {
      this.findById(id).then((_) => {
        if (_) {
          this.event.emit({ topic: JobSheetEvent.onAfterUpdate, data: _ });
        }
      });
      return {
        data,
        meta: {}
      };
    }
    throw new JobSheetError({ code: "JOB_SHEET_UPDATE_FAILED", args: { id } });
  }

  async remove(id: string): Promise<JobSheetRemoveResponse> {
    this.event.emit({ topic: JobSheetEvent.onBeforeRemove, id });
    const { data } = await this.JobSheetRepo.remove(id);
    if (data) {
      this.event.emit({ topic: JobSheetEvent.onAfterRemove, id });
      return {
        data,
        meta: {}
      };
    }
    throw new JobSheetError({ code: "JOB_SHEET_REMOVE_FAILED", args: { id } });
  }

  async findById(id: string): Promise<JobSheet | undefined> {
    return await this.JobSheetRepo.findById(id);
  }

  async find(filter?: JobSheetFilter): Promise<JobSheet[]> {
    return await this.JobSheetRepo.find(filter);
  }

  findPage(opts: PaginationOptions<JobSheetFilter>) {
    return this.JobSheetRepo.findPage(opts);
  }
}
