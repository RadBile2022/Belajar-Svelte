import {
  DbxError,
  DbxErrorOptions,
  ModuleConfig,
} from "@deboxsoft/module-core";

export type StudentCodeMessageError = keyof typeof codeMessageDefault;
type Options = DbxErrorOptions<StudentCodeMessageError> & {
  config?: Partial<ModuleConfig>;
};
const codeMessageDefault = {
  STUDENT_NOT_FOUND: "Student id `{{ id }} not found.`",
  STUDENT_CREATE_FAILED: "create Student id `{{ id }}` failed.",
  STUDENT_UPDATE_FAILED: "update Student id `{{ id }}` failed.",
  STUDENT_REMOVE_FAILED: "remove Student id `{{ id }}` failed.",
};

export class StudentError extends DbxError<StudentCodeMessageError> {
  constructor({ config = {}, message, ...options }: Options) {
    super({
      instanceOf: "StudentError",
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
