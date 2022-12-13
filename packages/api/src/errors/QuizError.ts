import {
  DbxError,
  DbxErrorOptions,
  ModuleConfig,
} from "@deboxsoft/module-core";

export type QuizCodeMessageError = keyof typeof codeMessageDefault;
type Options = DbxErrorOptions<QuizCodeMessageError> & {
  config?: Partial<ModuleConfig>;
};
const codeMessageDefault = {
  QUIZ_NOT_FOUND: "Quiz id `{{ id }} not found.`",
  QUIZ_CREATE_FAILED: "create Quiz id `{{ id }}` failed.",
  QUIZ_UPDATE_FAILED: "update Quiz id `{{ id }}` failed.",
  QUIZ_REMOVE_FAILED: "remove Quiz id `{{ id }}` failed.",
};

export class QuizError extends DbxError<QuizCodeMessageError> {
  constructor({ config = {}, message, ...options }: Options) {
    super({
      instanceOf: "QuizError",
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
