import { Container, getLogger, Logger, PaginationOptions } from "@deboxsoft/module-core";
import {
  QuizFilter,
  Quiz,
  QuizError,
  QuizEvent,
  QuizInput,
  QuizService,
  QuizUpdateInput,
  QuizDataInput,
  QuizCreateResponse,
  QuizUpdateResponse,
  QuizRemoveResponse,
  QUIZ_SERVICE_KEY
} from "@deboxsoft/lms-api";
import { MQEmitter } from "mqemitter";
import { getQuizRepo, QuizRepo } from "../db/index.js";
import { LmsPoltekServerModuleConfig } from "../types.js";

export const createQuizServiceServer = async (opts: LmsPoltekServerModuleConfig) => {
  const QuizRepo = getQuizRepo();
  const QuizService = new QuizServiceServer(QuizRepo, opts);
  Container.set(QUIZ_SERVICE_KEY, QuizService);
  return QuizService;
};

export class QuizServiceServer implements QuizService {
  logger: Logger;
  event: MQEmitter;
  constructor(private QuizRepo: QuizRepo, { event }: LmsPoltekServerModuleConfig) {
    this.logger = getLogger();
    this.event = event;
  }

  async create(input: QuizInput): Promise<QuizCreateResponse> {
    const dataInput: QuizDataInput = QuizInput.parse(input);
    this.event.emit({ topic: QuizEvent.onBeforeCreate, input: dataInput });
    const { data: id } = await this.QuizRepo.create(dataInput);
    if (id) {
      this.QuizRepo.findById(id).then((_) => {
        if (_) {
          this.event.emit({ topic: QuizEvent.onAfterCreate, data: _ });
          return _;
        } else {
        }
      });
      return {
        data: id,
        meta: {}
      };
    }
    throw new QuizError({ code: "QUIZ_CREATE_FAILED" });
  }

  async update(id, input: QuizUpdateInput): Promise<QuizUpdateResponse> {
    const dataInput: Partial<QuizDataInput> = QuizUpdateInput.parse(input);
    this.event.emit({ topic: QuizEvent.onBeforeUpdate, id, input: dataInput });
    const { data } = await this.QuizRepo.update(id, dataInput);
    if (data) {
      this.findById(id).then((_) => {
        if (_) {
          this.event.emit({ topic: QuizEvent.onAfterUpdate, data: _ });
        }
      });
      return {
        data,
        meta: {}
      };
    }
    throw new QuizError({ code: "QUIZ_UPDATE_FAILED", args: { id } });
  }

  async remove(id: string): Promise<QuizRemoveResponse> {
    this.event.emit({ topic: QuizEvent.onBeforeRemove, id });
    const { data } = await this.QuizRepo.remove(id);
    if (data) {
      this.event.emit({ topic: QuizEvent.onAfterRemove, id });
      return {
        data,
        meta: {}
      };
    }
    throw new QuizError({ code: "QUIZ_REMOVE_FAILED", args: { id } });
  }

  async findById(id: string): Promise<Quiz | undefined> {
    return await this.QuizRepo.findById(id);
  }

  async find(filter?: QuizFilter): Promise<Quiz[]> {
    return await this.QuizRepo.find(filter);
  }

  findPage(opts: PaginationOptions<QuizFilter>) {
    return this.QuizRepo.findPage(opts);
  }
}
