import { createConfigService } from "@deboxsoft/module-core/libs/config";
import { ServerApiConfig } from "@deboxsoft/module-core";
import { createApplication } from "@deboxsoft/module-fastify";
import { moduleLoader } from "./module.js";

const configService = createConfigService({
  fileKeys: ["app", "server", "db", "logger"]
});
const serverApiConfig = configService.get<ServerApiConfig>("server-api");
createApplication({
  ...serverApiConfig,
  configService,
  moduleLoader,
  jwtOpts: {
    cookie: {
      cookieName: "refresh-token",
      signed: false
    },
    sign: {
      expiresIn: "10m"
    }
  }
});
