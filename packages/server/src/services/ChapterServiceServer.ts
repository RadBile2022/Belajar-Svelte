import { Container, getLogger, Logger, PaginationOptions } from "@deboxsoft/module-core";
import {
  ChapterFilter,
  Chapter,
  ChapterError,
  ChapterEvent,
  ChapterInput,
  ChapterService,
  ChapterUpdateInput,
  ChapterDataInput,
  ChapterCreateResponse,
  ChapterUpdateResponse,
  ChapterRemoveResponse,
  CHAPTER_SERVICE_KEY
} from "@deboxsoft/lms-api";
import { MQEmitter } from "mqemitter";
import { getChapterRepo, ChapterRepo } from "../db/index.js";
import { LmsPoltekServerModuleConfig } from "../types.js";

export const createChapterServiceServer = async (opts: LmsPoltekServerModuleConfig) => {
  const ChapterRepo = getChapterRepo();
  const ChapterService = new ChapterServiceServer(ChapterRepo, opts);
  Container.set(CHAPTER_SERVICE_KEY, ChapterService);
  return ChapterService;
};

export class ChapterServiceServer implements ChapterService {
  logger: Logger;
  event: MQEmitter;
  constructor(private ChapterRepo: ChapterRepo, { event }: LmsPoltekServerModuleConfig) {
    this.logger = getLogger();
    this.event = event;
  }

  async create(input: ChapterInput): Promise<ChapterCreateResponse> {
    const dataInput: ChapterDataInput = ChapterInput.parse(input);
    this.event.emit({ topic: ChapterEvent.onBeforeCreate, input: dataInput });
    const { data: id } = await this.ChapterRepo.create(dataInput);
    if (id) {
      this.ChapterRepo.findById(id).then((_) => {
        if (_) {
          this.event.emit({ topic: ChapterEvent.onAfterCreate, data: _ });
          return _;
        } else {
        }
      });
      return {
        data: id,
        meta: {}
      };
    }
    throw new ChapterError({ code: "CHAPTER_CREATE_FAILED" });
  }

  async update(id, input: ChapterUpdateInput): Promise<ChapterUpdateResponse> {
    const dataInput: Partial<ChapterDataInput> = ChapterUpdateInput.parse(input);
    this.event.emit({ topic: ChapterEvent.onBeforeUpdate, id, input: dataInput });
    const { data } = await this.ChapterRepo.update(id, dataInput);
    if (data) {
      this.findById(id).then((_) => {
        if (_) {
          this.event.emit({ topic: ChapterEvent.onAfterUpdate, data: _ });
        }
      });
      return {
        data,
        meta: {}
      };
    }
    throw new ChapterError({ code: "CHAPTER_UPDATE_FAILED", args: { id } });
  }

  async remove(id: string): Promise<ChapterRemoveResponse> {
    this.event.emit({ topic: ChapterEvent.onBeforeRemove, id });
    const { data } = await this.ChapterRepo.remove(id);
    if (data) {
      this.event.emit({ topic: ChapterEvent.onAfterRemove, id });
      return {
        data,
        meta: {}
      };
    }
    throw new ChapterError({ code: "CHAPTER_REMOVE_FAILED", args: { id } });
  }

  async findById(id: string): Promise<Chapter | undefined> {
    return await this.ChapterRepo.findById(id);
  }

  async find(filter?: ChapterFilter): Promise<Chapter[]> {
    return await this.ChapterRepo.find(filter);
  }

  findPage(opts: PaginationOptions<ChapterFilter>) {
    return this.ChapterRepo.findPage(opts);
  }
}
