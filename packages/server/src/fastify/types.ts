import { ServerApiConfig } from "@deboxsoft/module-core";
import { FastifyJWTOptions } from "@fastify/jwt";
import { LmsPoltekServerModuleConfig } from "../types.js";

export type LmsPoltekServerApiOptions = LmsPoltekServerModuleConfig &
  ServerApiConfig & {
  setCookieOpts?: {
    domain?: string;
    path?: string;
    secure?: boolean;
    httpOnly?: boolean;
    sameSite?: boolean;
  };
  jwtOpts?: FastifyJWTOptions & {
    jwtTypeStore?: boolean;
  };
};

