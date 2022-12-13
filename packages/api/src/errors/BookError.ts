import {
  DbxError,
  DbxErrorOptions,
  ModuleConfig,
} from "@deboxsoft/module-core";

export type BookCodeMessageError = keyof typeof codeMessageDefault;
type Options = DbxErrorOptions<BookCodeMessageError> & {
  config?: Partial<ModuleConfig>;
};
const codeMessageDefault = {
  BOOK_NOT_FOUND: "Book id `{{ id }} not found.`",
  BOOK_CREATE_FAILED: "create Book id `{{ id }}` failed.",
  BOOK_UPDATE_FAILED: "update Book id `{{ id }}` failed.",
  BOOK_REMOVE_FAILED: "remove Book id `{{ id }}` failed.",
};

export class BookError extends DbxError<BookCodeMessageError> {
  constructor({ config = {}, message, ...options }: Options) {
    super({
      instanceOf: "BookError",
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
