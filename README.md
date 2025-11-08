<div align="center">

# ⚡ express-smart-limiter

[![npm version](https://img.shields.io/npm/v/@arjunv/express-smart-limiter?color=blue&logo=npm)](https://www.npmjs.com/package/express-smart-limiter)
[![build status](https://img.shields.io/github/actions/workflow/status/arjun7736/express-smart-limiter/test.yml?branch=main&label=tests&logo=github)](https://github.com/arjun7736/express-smart-limiter/actions)
[![license](https://img.shields.io/npm/l/@arjunv/express-smart-limiter?color=brightgreen)](LICENSE)
[![typescript](https://img.shields.io/badge/Made%20with-TypeScript-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Redis](https://img.shields.io/badge/Redis-DC382D?logo=redis&logoColor=white)](https://redis.io/)

</div>

> 🚀 A scalable, Redis-powered rate limiter middleware for Express, written in TypeScript.

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
npm install @arjunv/express-smart-limiter
