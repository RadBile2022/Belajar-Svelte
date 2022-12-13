import { EnrollmentRepo, ENROLLMENT_REPO_KEY } from "../index.js";
import { EnrollmentData, EnrollmentDataInput, EnrollmentError, EnrollmentFilter } from "@deboxsoft/lms-api";

import { Container, getLogger, Logger } from "@deboxsoft/module-core";
import { BaseRepository, getMongoDb, Db, ObjectId, TransactionOptions } from "@deboxsoft/module-mongo";
import { ModifiedResult } from "@deboxsoft/module-server";

export const createEnrollmentRepo = () => {
  const db = getMongoDb();
  const enrollmentRepo = new EnrollmentCollection(db);
  Container.set(ENROLLMENT_REPO_KEY, enrollmentRepo);
  return enrollmentRepo;
};

export class EnrollmentCollection extends BaseRepository<ObjectId, string, EnrollmentData> implements EnrollmentRepo {
  private logger: Logger;
  constructor(db: Db) {
    super();
    this.collection = db.collection("Enrollment");
    this.setupIndex();
    this.logger = getLogger();
  }

  async setupIndex() {}
  async create(input: EnrollmentDataInput, opts: TransactionOptions = {}): Promise<ModifiedResult<string>> {
    const metadata = await this.collection.insertOne(this._parseDataInput(input), opts);
    if (metadata.insertedId) {
      return { metadata, data: metadata.insertedId.toHexString() };
    }
    throw new EnrollmentError({ code: "ENROLLMENT_CREATE_FAILED" });
  }

  async update(id: string, input: Partial<EnrollmentDataInput>, opts: TransactionOptions = {}) {
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

  find(filter: EnrollmentFilter = {}, opts: TransactionOptions = {}): Promise<EnrollmentData[]> {
    return this.collection
      .find(filter, { sort: { _id: 1 }, ...opts })
      .map(this._parseDataOutput)
      .toArray();
  }

  findById(id: string, opts: TransactionOptions = {}): Promise<EnrollmentData | undefined> {
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
