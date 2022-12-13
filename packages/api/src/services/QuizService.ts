import {
  Quiz,
  QuizCreateResponse,
  QuizFilter,
  QuizInput,
  QuizRemoveResponse,
  QuizUpdateInput,
  QuizUpdateResponse
} from "../models/index.js";
import { Container, Pagination, PaginationOptions } from "@deboxsoft/module-core";

export const QuizEvent = {
  onBeforeCreate: "QUIZ-BEFORE-CREATE",
  onAfterCreate: "QUIZ-AFTER-CREATE",
  onBeforeUpdate: "QUIZ-BEFORE-UPDATE",
  onAfterUpdate: "QUIZ-AFTER-UPDATE-EVENT",
  onBeforeRemove: "QUIZ-BEFORE-REMOVE-EVENT",
  onAfterRemove: "QUIZ-AFTER-REMOVE-EVENT"
};
export const QUIZ_SERVICE_KEY = "QUIZ-SERVICE-KEY";
export const getQuizService = <S extends QuizService = QuizService>() => Container.get<S>(QUIZ_SERVICE_KEY);
export const hasQuizService = () => Container.has(QUIZ_SERVICE_KEY);
export interface QuizService {
  create(input: QuizInput): Promise<QuizCreateResponse>;
  update(id: string, input: QuizUpdateInput): Promise<QuizUpdateResponse>;
  remove(id: string): Promise<QuizRemoveResponse>;
  findById(id: string): Promise<Quiz | undefined>;
  find(filter?: Record<string, any>): Promise<Quiz[]>;
  findPage(options?: PaginationOptions<QuizFilter>): Promise<Pagination<Quiz>>;
}
