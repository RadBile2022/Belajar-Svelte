import { StudentRepo, STUDENT_REPO_KEY } from "../index.js";
import { StudentData, StudentDataInput, StudentError, StudentFilter } from "@deboxsoft/lms-api";

import { Container, getLogger, Logger } from "@deboxsoft/module-core";
import { BaseRepository, getMongoDb, Db, ObjectId, TransactionOptions } from "@deboxsoft/module-mongo";
import { ModifiedResult } from "@deboxsoft/module-server";

export const createStudentRepo = () => {
  const db = getMongoDb();
  const studentRepo = new StudentCollection(db);
  Container.set(STUDENT_REPO_KEY, studentRepo);
  return studentRepo;
};

export class StudentCollection extends BaseRepository<ObjectId, string, StudentData> implements StudentRepo {
  private logger: Logger;
  constructor(db: Db) {
    super();
    this.collection = db.collection("Student");
    this.setupIndex();
    this.logger = getLogger();
  }

  async setupIndex() {}
  async create(input: StudentDataInput, opts: TransactionOptions = {}): Promise<ModifiedResult<string>> {
    const metadata = await this.collection.insertOne(this._parseDataInput(input), opts);
    if (metadata.insertedId) {
      return { metadata, data: metadata.insertedId.toHexString() };
    }
    throw new StudentError({ code: "STUDENT_CREATE_FAILED" });
  }

  async update(id: string, input: Partial<StudentDataInput>, opts: TransactionOptions = {}) {
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

  find(filter: StudentFilter = {}, opts: TransactionOptions = {}): Promise<StudentData[]> {
    return this.collection
      .find(filter, { sort: { _id: 1 }, ...opts })
      .map(this._parseDataOutput)
      .toArray();
  }

  findById(id: string, opts: TransactionOptions = {}): Promise<StudentData | undefined> {
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
