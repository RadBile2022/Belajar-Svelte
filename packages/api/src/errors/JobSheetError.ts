import {
  DbxError,
  DbxErrorOptions,
  ModuleConfig,
} from "@deboxsoft/module-core";

export type JobSheetCodeMessageError = keyof typeof codeMessageDefault;
type Options = DbxErrorOptions<JobSheetCodeMessageError> & {
  config?: Partial<ModuleConfig>;
};
const codeMessageDefault = {
  JOB_SHEET_NOT_FOUND: "JobSheet id `{{ id }} not found.`",
  JOB_SHEET_CREATE_FAILED: "create JobSheet id `{{ id }}` failed.",
  JOB_SHEET_UPDATE_FAILED: "update JobSheet id `{{ id }}` failed.",
  JOB_SHEET_REMOVE_FAILED: "remove JobSheet id `{{ id }}` failed.",
};

export class JobSheetError extends DbxError<JobSheetCodeMessageError> {
  constructor({ config = {}, message, ...options }: Options) {
    super({
      instanceOf: "JobSheetError",
      ...options,
    });
    if (this.code) {
      this.setMessage(
        config[this.code] || codeMessageDefault[this.code],
        this.args
      );
    } else if (message) {
      this.setMessage(message, this.args);
    }
  }
}
