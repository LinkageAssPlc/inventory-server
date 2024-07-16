import { prop as Property, getModelForClass } from '@typegoose/typegoose'; //

export class RedisMongo {
  @Property({type: String, required: true})
  key: string;

  @Property({type: String, required: true})
  value: string;

  @Property({type: Number})
  expirationTime?: number;

  @Property({type: Date, default: new Date()})
  beginTime: Date;
}

export const RedisMongoModel = getModelForClass(RedisMongo, {schemaOptions: {timestamps: true}});
