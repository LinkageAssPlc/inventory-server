// import { Types } from "mongoose";
import { ObjectId } from "mongodb"; //

export type MongoDbFields = {
  '_id': ObjectId;
  '__v': number;
  'createdAt': Date;
  'updatedAt': string;
};

export type AddAllMongoDBFields<T> = T & MongoDbFields;
export type AddSomeMongoDBFields<T extends keyof MongoDbFields, U>= Pick<MongoDbFields, T> & U;

// const c = { a: 1, b: 2 };

// let e: AddSomeMongoDBFields<'_id' | 'createdAt', typeof c> = {
//   a: 1, b: 2, '_id': new Types.ObjectId('cv'), 'createdAt': new Date(),
// };
