"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _winston = _interopRequireDefault(require("../external-libs/winston"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

var schema = _joi.default.object({
  NODE_ENV: _joi.default.string().valid('development', 'production', 'test', 'staging').default('development'),
  PORT: _joi.default.number().default(9000),
  API_PATH: _joi.default.string().default('/api'),
  CORS_ENABLED: _joi.default.boolean().default(false),
  CORS_WHITE_LIST: _joi.default.string().default(null),
  MONGO_HOST: _joi.default.string().default('localhost'),
  MONGO_PORT: _joi.default.number().default(27017),
  MONGO_USERNAME: _joi.default.string().empty('').default(null),
  MONGO_PASSWORD: _joi.default.string().empty('').default(null),
  MONGO_NAME: _joi.default.string().default('restful-db'),
  MONGO_COLLECTION_PREFIX: _joi.default.string().default('col'),
  REDIS_HOST: _joi.default.string().default('localhost'),
  REDIS_PORT: _joi.default.number().default(6379),
  REDIS_PASSWORD: _joi.default.string().empty('').default(null),
  REDIS_TLS: _joi.default.string().default('0'),
  CACHE_TTL_QUERY: _joi.default.number().empty('').default(60 * 15),
  CACHE_TTL_ID: _joi.default.number().empty('').default(60 * 30),
  MAXIMUM_LIMIT_SIZE: _joi.default.number().empty('').default(500)
});

var envConfig = function envConfig() {
  try {
    var validConfigs = schema.validate(process.env, {
      abortEarly: true,
      // throw error right in first check
      allowUnknown: true
    });
    if (validConfigs.error) throw validConfigs.error;
    var config = {
      env: validConfigs.value.NODE_ENV,
      port: validConfigs.value.PORT,
      apiPath: validConfigs.value.API_PATH,
      cors: {
        allowed: validConfigs.value.CORS_ENABLED,
        whitelist: JSON.parse(validConfigs.value.CORS_WHITE_LIST)
      },
      mongo: {
        host: validConfigs.value.MONGO_HOST,
        port: validConfigs.value.MONGO_PORT,
        username: validConfigs.value.MONGO_USERNAME,
        password: validConfigs.value.MONGO_PASSWORD,
        name: validConfigs.value.MONGO_NAME,
        prefix: validConfigs.value.MONGO_COLLECTION_PREFIX
      },
      redis: {
        host: validConfigs.value.REDIS_HOST,
        port: validConfigs.value.REDIS_PORT,
        password: validConfigs.value.REDIS_PASSWORD,
        dbName: validConfigs.value.REDIS_DBNAME
      },
      cache: {
        ttlQuery: validConfigs.value.CACHE_TTL_QUERY,
        ttlId: validConfigs.value.CACHE_TTL_ID
      },
      limitQuerySize: validConfigs.value.MAXIMUM_LIMIT_SIZE
    };

    _winston.default.info('EnvConfig: Initialized');

    console.log('config: ', config);
    return config;
  } catch (error) {
    _winston.default.error("EnvConfig ".concat(error, " with details ").concat(JSON.stringify(error.details)));

    throw new Error(error);
  }
};

var _default = envConfig();

exports.default = _default;