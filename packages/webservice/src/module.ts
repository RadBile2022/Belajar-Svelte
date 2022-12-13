import type { ModuleLoaderOptions } from "@deboxsoft/module-fastify";
import { getLogger } from "@deboxsoft/module-core";
import { registerUsersRoute } from "@deboxsoft/users-server/libs/fastify";
import { FastifyInstance } from "fastify";
import {
  createLmsPoltekFastifyRoute,
  createLmsPoltekMongoRepo,
  createLmsPoltekServiceServer
} from "@deboxsoft/lms-server";
import { getConfigService } from "@deboxsoft/module-core/libs/config";
import "@deboxsoft/module-server";

export const moduleLoader = async (app: FastifyInstance<any>, opts: ModuleLoaderOptions) => {
  const configService = getConfigService();
  const logger = getLogger();
  logger.debug("- module loader");
  const serverApiConfig = configService.get("server-api");
  const usersConfig = configService.get("users");
  const lmsConfig = configService.get("lms");
  app.addHook("onRoute", (_) => {
    // console.log(_.url, _.method);
  });
  await registerUsersRoute(app, {
    ...usersConfig,
    ...serverApiConfig,
    event: opts.event,
    logger,
    jwtOpts: {
      secret: usersConfig.tokenSecret,
      jwtTypeStore: "cookie",
      cookie: {
        cookieName: "_tok-lms"
      }
    }
  });
  createLmsPoltekMongoRepo();
  await createLmsPoltekServiceServer({
    ...serverApiConfig,
    ...lmsConfig,
    event: opts.event,
    errors: {}
  });
  await createLmsPoltekFastifyRoute(app, {
    ...serverApiConfig,
    ...lmsConfig,
    event: opts.event,
    errors: {}
  });
};
