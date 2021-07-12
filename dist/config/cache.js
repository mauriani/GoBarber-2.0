"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  driver: 'redis',
  config: {
    redis: {
      port: process.env.REDIS_PORT,
      // Redis port
      host: process.env.REDIS_HOST,
      // Redis host
      password: process.env.REDIS_PASS || undefined
    }
  }
};
exports.default = _default;