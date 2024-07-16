import { AddAllMongoDBFields, RedisMongo, RedisMongoModel } from "../inventory-entities";

export const redisMongo = {
  set: async (key: string, value: string, expirationTime?: number) => {
    const tstore = await RedisMongoModel.findOne({key}) as AddAllMongoDBFields<RedisMongo>;
    if (!tstore) {
      await RedisMongoModel.create({ key, value, expirationTime: expirationTime || 0, beginTime: new Date()});
    }else {
      await RedisMongoModel.findOneAndUpdate(
        {key},
        {key, value, expirationTime: expirationTime || 0, beginTime: new Date()}
      );
    }
  },
  get: async (key: string) => {
    const tstore = await RedisMongoModel.findOne({key}) as AddAllMongoDBFields<RedisMongo>;
    if (!tstore) return null;
    const { value, expirationTime, beginTime } = tstore;
    if (expirationTime){
      const then = (new Date(beginTime)).getTime();
      const now = (new Date()).getTime();
      const timeElapsed = now > (then + (expirationTime * 1000));
      if (timeElapsed) return null;
    }
    return value;
  }
};
