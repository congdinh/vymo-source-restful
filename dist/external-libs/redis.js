"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.RedisConfigOption = void 0;

var _ioredis = _interopRequireDefault(require("ioredis"));

var _configs = _interopRequireDefault(require("../configs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RedisConfigOption = {
  host: _configs.default.redis.host,
  port: _configs.default.redis.port,
  password: _configs.default.redis.password,
  db: _configs.default.redis.dbName,
  retry_strategy: function retry_strategy(options) {
    return Math.max(options.attempt * 100, 3000);
  }
};
exports.RedisConfigOption = RedisConfigOption;
var redis = new _ioredis.default(RedisConfigOption);
var _default = redis;
exports.default = _default;