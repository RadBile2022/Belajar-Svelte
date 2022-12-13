import { Logger, ModuleConfig } from "@deboxsoft/module-core";
import { MQEmitter } from "mqemitter";

export interface LmsPoltekServerModuleConfig extends ModuleConfig {
  logger: Logger;
  event: MQEmitter;
}
