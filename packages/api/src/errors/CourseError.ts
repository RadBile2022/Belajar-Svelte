import {
  DbxError,
  DbxErrorOptions,
  ModuleConfig,
} from "@deboxsoft/module-core";

export type CourseCodeMessageError = keyof typeof codeMessageDefault;
type Options = DbxErrorOptions<CourseCodeMessageError> & {
  config?: Partial<ModuleConfig>;
};
const codeMessageDefault = {
  COURSE_NOT_FOUND: "Course id `{{ id }} not found.`",
  COURSE_CREATE_FAILED: "create Course id `{{ id }}` failed.",
  COURSE_UPDATE_FAILED: "update Course id `{{ id }}` failed.",
  COURSE_REMOVE_FAILED: "remove Course id `{{ id }}` failed.",
};

export class CourseError extends DbxError<CourseCodeMessageError> {
  constructor({ config = {}, message, ...options }: Options) {
    super({
      instanceOf: "CourseError",
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
