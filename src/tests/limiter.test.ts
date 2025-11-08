import express, { Request } from "express";
import request from "supertest";
import { rateLimiter } from "../limiter";
import { mockRedis } from "./redisMock";

jest.mock("../redisClient", () => ({
  getRedisClient: () => mockRedis,
}));

describe("Redis Rate Limiter Middleware", () => {
  let app: express.Express;

  beforeEach(() => {
    app = express();

    app.use(
      rateLimiter({
        windowMs: 60_000, 
        max: 2, 
        redisUrl: "redis://localhost:6379",
      })
    );

    app.get("/", (req, res) => res.send("OK"));
  });

  it("should allow requests under the limit", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.text).toBe("OK");
  });

  it("should block requests exceeding the limit", async () => {
    await request(app).get("/");
    await request(app).get("/");
    
    const res = await request(app).get("/");
    expect(res.status).toBe(429);
    expect(res.body.message).toContain("Too many");
  });

  it("should set rate limit headers", async () => {
    const res = await request(app).get("/");
    expect(res.headers["x-ratelimit-limit"]).toBeDefined();
    expect(res.headers["x-ratelimit-remaining"]).toBeDefined();
    expect(res.headers["x-ratelimit-reset"]).toBeDefined();
  });
});
