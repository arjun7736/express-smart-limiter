<div align="center">

# ⚡ express-smart-limiter

[![npm version](https://img.shields.io/npm/v/@arjunv/express-smart-limiter?color=blue&logo=npm)](https://www.npmjs.com/package/express-smart-limiter)
[![build status](https://img.shields.io/github/actions/workflow/status/arjun7736/express-smart-limiter/test.yml?branch=main&label=tests&logo=github)](https://github.com/arjun7736/express-smart-limiter/actions)
[![license](https://img.shields.io/npm/l/@arjunv/express-smart-limiter?color=brightgreen)](LICENSE)
[![typescript](https://img.shields.io/badge/Made%20with-TypeScript-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Redis](https://img.shields.io/badge/Redis-DC382D?logo=redis&logoColor=white)](https://redis.io/)

</div>

> 🚀 A scalable, Redis-powered rate limiter middleware for Express, written in TypeScript. (First Build)

---

## ✨ Features

- 🔥 **Redis-backed** — works across distributed servers  
- ⚙️ **Plug-and-play Express middleware**  
- 🧠 **Custom key generators** (IP, user ID, API key, etc.)  
- 📈 **Standard rate-limit headers** (`X-RateLimit-*`)  
- 💬 **Hook on limit reached** for logging or blocking  
- 🧩 **Written in TypeScript** with full typings  
- ✅ **Unit-tested with Jest**

---

## 📦 Installation

```bash
npm i express-smart-limiter
```
## 🧩 Usage & Configuration

The `rateLimiter()` middleware accepts a configuration object with the following properties:

| Option | Type | Required | Default | Description |
|---------|------|-----------|----------|-------------|
| `windowMs` | `number` | ✅ | `60000` | Time window in milliseconds (e.g., 1 minute = 60000). |
| `max` | `number` | ✅ | `60` | Maximum number of requests per `windowMs`. |
| `redisUrl` | `string` | ✅ | `"redis://localhost:6379"` | Redis connection string used to track rate limits. |
| `keyGenerator` | `(req: Request) => string` | ❌ | `req.ip` | Function to generate a unique key (e.g., user ID or IP). |
| `message` | `string` | ❌ | `"Too many requests, please try again later."` | Custom error message when the rate limit is exceeded. |
| `onLimitReached` | `(key: string, count: number) => void` | ❌ | — | Optional callback executed when a client exceeds the rate limit. |

---

### 🔹 **Example: Default IP-Based Limiting**

```ts
import express from "express";
import { rateLimiter } from "express-smart-limiter";

const app = express();

app.use(
  rateLimiter({
    windowMs: 60_000, // 1 minute
    max: 100, // limit each IP to 100 requests per window
    redisUrl: "redis://localhost:6379",
  })
);

app.get("/", (req, res) => res.send("Hello, world! 🌍"));

app.listen(3000, () => console.log("Server running on port 3000"));
```