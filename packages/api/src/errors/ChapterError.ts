import {
  DbxError,
  DbxErrorOptions,
  ModuleConfig,
} from "@deboxsoft/module-core";

export type ChapterCodeMessageError = keyof typeof codeMessageDefault;
type Options = DbxErrorOptions<ChapterCodeMessageError> & {
  config?: Partial<ModuleConfig>;
};
const codeMessageDefault = {
  CHAPTER_NOT_FOUND: "Chapter id `{{ id }} not found.`",
  CHAPTER_CREATE_FAILED: "create Chapter id `{{ id }}` failed.",
  CHAPTER_UPDATE_FAILED: "update Chapter id `{{ id }}` failed.",
  CHAPTER_REMOVE_FAILED: "remove Chapter id `{{ id }}` failed.",
};

export class ChapterError extends DbxError<ChapterCodeMessageError> {
  constructor({ config = {}, message, ...options }: Options) {
    super({
      instanceOf: "ChapterError",
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
