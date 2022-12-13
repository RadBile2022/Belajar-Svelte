import { QuizRepo, QUIZ_REPO_KEY } from "../index.js";
import { QuizData, QuizDataInput, QuizError, QuizFilter } from "@deboxsoft/lms-api";

import { Container, getLogger, Logger } from "@deboxsoft/module-core";
import { BaseRepository, getMongoDb, Db, ObjectId, TransactionOptions } from "@deboxsoft/module-mongo";
import { ModifiedResult } from "@deboxsoft/module-server";

export const createQuizRepo = () => {
  const db = getMongoDb();
  const quizRepo = new QuizCollection(db);
  Container.set(QUIZ_REPO_KEY, quizRepo);
  return quizRepo;
};

export class QuizCollection extends BaseRepository<ObjectId, string, QuizData> implements QuizRepo {
  private logger: Logger;
  constructor(db: Db) {
    super();
    this.collection = db.collection("Quiz");
    this.setupIndex();
    this.logger = getLogger();
  }

  async setupIndex() {}
  async create(input: QuizDataInput, opts: TransactionOptions = {}): Promise<ModifiedResult<string>> {
    const metadata = await this.collection.insertOne(this._parseDataInput(input), opts);
    if (metadata.insertedId) {
      return { metadata, data: metadata.insertedId.toHexString() };
    }
    throw new QuizError({ code: "QUIZ_CREATE_FAILED" });
  }

  async update(id: string, input: Partial<QuizDataInput>, opts: TransactionOptions = {}) {
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

  find(filter: QuizFilter = {}, opts: TransactionOptions = {}): Promise<QuizData[]> {
    return this.collection
      .find(filter, { sort: { _id: 1 }, ...opts })
      .map(this._parseDataOutput)
      .toArray();
  }

  findById(id: string, opts: TransactionOptions = {}): Promise<QuizData | undefined> {
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
