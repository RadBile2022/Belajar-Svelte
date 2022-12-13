import { ChapterRepo, CHAPTER_REPO_KEY } from "../index.js";
import { ChapterData, ChapterDataInput, ChapterError, ChapterFilter } from "@deboxsoft/lms-api";

import { Container, getLogger, Logger } from "@deboxsoft/module-core";
import { BaseRepository, getMongoDb, Db, ObjectId, TransactionOptions } from "@deboxsoft/module-mongo";
import { ModifiedResult } from "@deboxsoft/module-server";

export const createChapterRepo = () => {
  const db = getMongoDb();
  const chapterRepo = new ChapterCollection(db);
  Container.set(CHAPTER_REPO_KEY, chapterRepo);
  return chapterRepo;
};

export class ChapterCollection extends BaseRepository<ObjectId, string, ChapterData> implements ChapterRepo {
  private logger: Logger;
  constructor(db: Db) {
    super();
    this.collection = db.collection("Chapter");
    this.setupIndex();
    this.logger = getLogger();
  }

  async setupIndex() {}
  async create(input: ChapterDataInput, opts: TransactionOptions = {}): Promise<ModifiedResult<string>> {
    const metadata = await this.collection.insertOne(this._parseDataInput(input), opts);
    if (metadata.insertedId) {
      return { metadata, data: metadata.insertedId.toHexString() };
    }
    throw new ChapterError({ code: "CHAPTER_CREATE_FAILED" });
  }

  async update(id: string, input: Partial<ChapterDataInput>, opts: TransactionOptions = {}) {
    const _id = ObjectId.createFromHexString(id);
    const metadata = await this.collection.updateOne({ _id }, { $set: input }, opts);
    return { metadata, data: metadata.acknowledged };
  }

  async remove(id: string | string[], opts: TransactionOptions = {}) {
    if (Array.isArray(id)) {
      const _ids = id.map((_) => ObjectId.createFromHexString(_));
      const metadata = await this.collection.deleteMany({ _id: { $in: _ids } }, opts);
      return { metadata, data: metadata.acknowledged };
    }
    const _id = ObjectId.createFromHexString(id);
    const metadata = await this.collection.deleteOne({ _id }, opts);
    return { metadata, data: metadata.acknowledged };
  }

  find(filter: ChapterFilter = {}, opts: TransactionOptions = {}): Promise<ChapterData[]> {
    return this.collection
      .find(filter, { sort: { _id: 1 }, ...opts })
      .map(this._parseDataOutput)
      .toArray();
  }

  findById(id: string, opts: TransactionOptions = {}): Promise<ChapterData | undefined> {
    try {
      const _id = ObjectId.createFromHexString(id);
      const query: Record<string, any> = { _id };
      return this.collection.findOne(query, opts).then(this._parseDataOutput);
    } catch (e) {
      this.logger.debug(e);
      throw e;
    }
  }
}
