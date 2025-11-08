import type { Request } from "express";

export interface RateLimiterOptions {
  windowMs: number; 
  max: number;
  redisUrl: string;
  keyGenerator?: (req: Request) => string;
  message?: string;
  onLimitReached?: (key: string, count: number) => void;
}
