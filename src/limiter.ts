import type { Request, Response, NextFunction } from "express";
import { getRedisClient } from "./redisClient";
import type { RateLimiterOptions } from "./types";

export function rateLimiter(options: RateLimiterOptions) {
  const {
    windowMs,
    max,
    redisUrl,
    keyGenerator = (req) => req.ip,
    message = "Too many requests, please try again later.",
    onLimitReached,
  } = options;

  const redis = getRedisClient(redisUrl);

  return async (req: Request, res: Response, next: NextFunction) => {
    const clientKey =
      typeof keyGenerator === "function"
        ? keyGenerator(req)
        : req.headers["x-forwarded-for"]?.toString().split(",")[0]?.trim() ||
          req.socket.remoteAddress ||
          req.ip ||
          "unknown";

    const key = `ratelimit:${clientKey}`;

    const ttlSeconds = Math.ceil(windowMs / 1000);

    const currentCount = await redis.incr(key);
    if (currentCount === 1) await redis.expire(key, ttlSeconds);

    const remaining = Math.max(0, max - currentCount);
    const ttl = await redis.ttl(key);

    res.setHeader("X-RateLimit-Limit", max);
    res.setHeader("X-RateLimit-Remaining", remaining);
    res.setHeader("X-RateLimit-Reset", ttl);

    if (currentCount > max) {
      if (onLimitReached) {
        onLimitReached(key, currentCount);
      } else {
        console.warn(
          `🚨 Rate limit exceeded for IP: ${key} (${currentCount} requests in ${windowMs}ms)`
        );
      }
      res.setHeader("Retry-After", ttl);
      return res.status(429).json({ message });
    }

    next();
  };
}
