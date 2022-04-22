"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.connect = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _configs = _interopRequireDefault(require("../configs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_mongoose.default.Promise = global.Promise;

var connect = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {
    var _ref2,
        _ref2$host,
        host,
        _ref2$port,
        port,
        _ref2$dbName,
        dbName,
        _ref2$user,
        user,
        _ref2$pass,
        pass,
        mongoURL,
        _args = arguments;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ref2 = _args.length > 0 && _args[0] !== undefined ? _args[0] : {}, _ref2$host = _ref2.host, host = _ref2$host === void 0 ? _configs.default.mongo.host : _ref2$host, _ref2$port = _ref2.port, port = _ref2$port === void 0 ? _configs.default.mongo.port : _ref2$port, _ref2$dbName = _ref2.dbName, dbName = _ref2$dbName === void 0 ? _configs.default.mongo.name : _ref2$dbName, _ref2$user = _ref2.user, user = _ref2$user === void 0 ? _configs.default.mongo.username : _ref2$user, _ref2$pass = _ref2.pass, pass = _ref2$pass === void 0 ? _configs.default.mongo.password : _ref2$pass;
            mongoURL = "mongodb://".concat(host, ":").concat(port, "/").concat(dbName);

            if (user && pass) {
              mongoURL = "mongodb://".concat(user, ":").concat(pass, "@").concat(host, ":").concat(port, "/").concat(dbName, "?authSource=admin&w=1");
            }

            _mongoose.default.set('debug', true);

            _context.next = 6;
            return _mongoose.default.connect(mongoURL, {
              useNewUrlParser: true,
              useCreateIndex: true,
              useUnifiedTopology: true,
              useFindAndModify: false,
              keepAlive: true,
              connectTimeoutMS: 10000
            });

          case 6:
            return _context.abrupt("return", _mongoose.default);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function connect() {
    return _ref.apply(this, arguments);
  };
}();

exports.connect = connect;
var _default = _mongoose.default;
exports.default = _default;