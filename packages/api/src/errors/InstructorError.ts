import {
  DbxError,
  DbxErrorOptions,
  ModuleConfig,
} from "@deboxsoft/module-core";

export type InstructorCodeMessageError = keyof typeof codeMessageDefault;
type Options = DbxErrorOptions<InstructorCodeMessageError> & {
  config?: Partial<ModuleConfig>;
};
const codeMessageDefault = {
  INSTRUCTOR_NOT_FOUND: "Instructor id `{{ id }} not found.`",
  INSTRUCTOR_CREATE_FAILED: "create Instructor id `{{ id }}` failed.",
  INSTRUCTOR_UPDATE_FAILED: "update Instructor id `{{ id }}` failed.",
  INSTRUCTOR_REMOVE_FAILED: "remove Instructor id `{{ id }}` failed.",
};

export class InstructorError extends DbxError<InstructorCodeMessageError> {
  constructor({ config = {}, message, ...options }: Options) {
    super({
      instanceOf: "InstructorError",
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
