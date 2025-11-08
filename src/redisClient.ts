import Redis from "ioredis";

let client: Redis;

export function getRedisClient(redisUrl?: string): Redis {
  if(!redisUrl){
    throw new Error("Redis Url is Missing")
  }
  if (!client) {
    client = new Redis(redisUrl);
  }
  return client;
}
