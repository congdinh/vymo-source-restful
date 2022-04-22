"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _winston = _interopRequireDefault(require("winston"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logger = _winston.default.createLogger({
  format: _winston.default.format.combine(_winston.default.format.splat(), _winston.default.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }), _winston.default.format.colorize(), _winston.default.format.printf(function (log) {
    if (log.stack) return "[".concat(log.timestamp, "] [").concat(log.level, "] ").concat(log.stack);
    return "[".concat(log.timestamp, "] [").concat(log.level, "] ").concat(log.message);
  })),
  transports: [new _winston.default.transports.Console(), new _winston.default.transports.File({
    level: 'info',
    filename: _path.default.join("./logs", 'access.log')
  }), new _winston.default.transports.File({
    level: 'error',
    filename: _path.default.join("./logs", 'errors.log')
  })]
});

var _default = logger;
exports.default = _default;