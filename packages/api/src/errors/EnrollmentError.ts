import {
  DbxError,
  DbxErrorOptions,
  ModuleConfig,
} from "@deboxsoft/module-core";

export type EnrollmentCodeMessageError = keyof typeof codeMessageDefault;
type Options = DbxErrorOptions<EnrollmentCodeMessageError> & {
  config?: Partial<ModuleConfig>;
};
const codeMessageDefault = {
  ENROLLMENT_NOT_FOUND: "Enrollment id `{{ id }} not found.`",
  ENROLLMENT_CREATE_FAILED: "create Enrollment id `{{ id }}` failed.",
  ENROLLMENT_UPDATE_FAILED: "update Enrollment id `{{ id }}` failed.",
  ENROLLMENT_REMOVE_FAILED: "remove Enrollment id `{{ id }}` failed.",
};

export class EnrollmentError extends DbxError<EnrollmentCodeMessageError> {
  constructor({ config = {}, message, ...options }: Options) {
    super({
      instanceOf: "EnrollmentError",
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
