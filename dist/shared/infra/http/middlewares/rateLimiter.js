"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = rateLimiter;

var _redis = _interopRequireDefault(require("redis"));

var _rateLimiterFlexible = require("rate-limiter-flexible");

var _AppError = _interopRequireDefault(require("../../../errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const RedisClient = _redis.default.createClient({
  port: Number(process.env.REDIS_PORT),
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASS || undefined
});

const limiter = new _rateLimiterFlexible.RateLimiterRedis({
  storeClient: RedisClient,
  points: 5,
  // Quantas requisições o usuário pode fazer
  duration: 1,
  // dentro de
  keyPrefix: 'ratelimit'
});

async function rateLimiter(request, response, next) {
  try {
    await limiter.consume(request.ip);
    return next();
  } catch (err) {
    throw new _AppError.default('Too many requests', 429);
  }
}