// prettier-ignore
import {
  /* GEN-ADD: import-services */
  createEnrollmentServiceServer,
  createChapterServiceServer,
  createQuizServiceServer,
  createJobSheetServiceServer,
  createInstructorServiceServer,
  createStudentServiceServer,
  createCourseServiceServer,
  createBookServiceServer
  /* GEN-END: import-services */
} from "./services/index.js";

// prettier-ignore
import {
  /* GEN-ADD: import-mongo */
  createEnrollmentRepo,
  createChapterRepo,
  createQuizRepo,
  createJobSheetRepo,
  createInstructorRepo,
  createStudentRepo,
  createCourseRepo,
  createBookRepo
  /* GEN-END: import-mongo */
} from "./db/mongo/index.js";

// prettier-ignore
import {
  /* GEN-ADD: import-fastify */
  createEnrollmentRoute,
  createChapterRoute,
  createQuizRoute,
  createJobSheetRoute,
  createInstructorRoute,
  createStudentRoute,
  createCourseRoute,
  createBookRoute
  /* GEN-END: import-fastify */
} from "./fastify/index.js";

import { FastifyInstance } from "fastify";
import { LmsPoltekServerApiOptions } from "./fastify/types.js";
import { LmsPoltekServerModuleConfig } from "./types.js";

export const createLmsPoltekServiceServer = async (config: LmsPoltekServerModuleConfig) => {
  /* GEN-ADD: create-service */
  await createEnrollmentServiceServer(config);
  await createChapterServiceServer(config);
  await createQuizServiceServer(config);
  await createJobSheetServiceServer(config);
  await createInstructorServiceServer(config);
  await createStudentServiceServer(config);
  await createCourseServiceServer(config);
  await createBookServiceServer(config);
  /* GEN-END: create-service */
};

export const createLmsPoltekMongoRepo = () => {
  /* GEN-ADD: create-mongo */
  createEnrollmentRepo();
  createChapterRepo();
  createQuizRepo();
  createJobSheetRepo();
  createInstructorRepo();
  createStudentRepo();
  createCourseRepo();
  createBookRepo();
  /* GEN-END: create-mongo */
};

export const createLmsPoltekFastifyRoute = async (instance: FastifyInstance<any>, opts: LmsPoltekServerApiOptions) => {
  /* GEN-ADD: create-fastify */
  createEnrollmentRoute(instance, opts);
  createChapterRoute(instance, opts);
  createQuizRoute(instance, opts);
  createJobSheetRoute(instance, opts);
  createInstructorRoute(instance, opts);
  createStudentRoute(instance, opts);
  createCourseRoute(instance, opts);
  createBookRoute(instance, opts);
  /* GEN-END: create-fastify */
};
