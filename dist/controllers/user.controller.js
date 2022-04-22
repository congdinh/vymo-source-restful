"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUsers = exports.getUser = exports.createUser = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _fastestValidator = _interopRequireDefault(require("fastest-validator"));

var _configs = _interopRequireDefault(require("../configs"));

var _constant = require("../configs/constant");

var _datasources = _interopRequireDefault(require("../datasources"));

var _excluded = ["email", "name"],
    _excluded2 = ["name", "email"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var User = _datasources.default.User;
var validateCreateUser = new _fastestValidator.default().compile({
  $$strict: true,
  // no additional properties allowed
  name: {
    type: 'string',
    min: 3,
    max: 30,
    trim: true,
    lowercase: true
  },
  email: {
    type: 'email'
  },
  phoneNumber: {
    type: 'string',
    min: 10
  },
  address: {
    type: 'string',
    min: 1,
    max: 30,
    optional: true
  },
  dob: {
    type: 'string',
    min: 1,
    max: 30,
    optional: true
  }
});
/*
 * GET: Latest User
 */

var getUser = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(req, res) {
    var result, docs;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            result = {
              statusCode: 200,
              message: 'Success'
            };
            _context.prev = 1;
            _context.next = 4;
            return User.filterAndPaging({
              orderBy: {
                createdAt: _constant.SORT_TYPE.DESC
              },
              query: {},
              limit: 1,
              skip: 0
            }, _configs.default.cache.ttlQuery);

          case 4:
            docs = _context.sent;
            result = _objectSpread(_objectSpread({}, result), docs);
            _context.next = 12;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](1);
            result.statusCode = 404;
            result.message = _context.t0.message;

          case 12:
            return _context.abrupt("return", res.status(200).json(result));

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 8]]);
  }));

  return function getUser(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
/*
 * GET: List user by query
 */


exports.getUser = getUser;

var getUsers = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2(req, res) {
    var result, _req$body, orderBy, _req$body$where, where, _req$body$limit, limit, _req$body$skip, skip, email, name, other, query, docs;

    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            result = {
              statusCode: 200,
              message: 'Success',
              data: []
            };
            _context2.prev = 1;
            _req$body = req.body, orderBy = _req$body.orderBy, _req$body$where = _req$body.where, where = _req$body$where === void 0 ? {} : _req$body$where, _req$body$limit = _req$body.limit, limit = _req$body$limit === void 0 ? 20 : _req$body$limit, _req$body$skip = _req$body.skip, skip = _req$body$skip === void 0 ? 0 : _req$body$skip;
            if (limit > _configs.default.limitQuerySize) limit = _configs.default.limitQuerySize;
            email = where.email, name = where.name, other = _objectWithoutProperties(where, _excluded);
            query = _objectSpread({}, other);

            if (name) {
              query.name = {
                $regex: name,
                $options: 'i'
              };
            }

            if (email) {
              query.email = {
                $regex: email,
                $options: 'i'
              };
            }

            _context2.next = 10;
            return User.filterAndPaging({
              orderBy: orderBy,
              query: query,
              limit: limit,
              skip: skip
            }, _configs.default.cache.ttlQuery);

          case 10:
            docs = _context2.sent;
            result = _objectSpread(_objectSpread({}, result), docs);
            _context2.next = 18;
            break;

          case 14:
            _context2.prev = 14;
            _context2.t0 = _context2["catch"](1);
            result.statusCode = 404;
            result.message = _context2.t0.message;

          case 18:
            return _context2.abrupt("return", res.status(200).json(result));

          case 19:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 14]]);
  }));

  return function getUsers(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
/*
 * POST: Create User
 */


exports.getUsers = getUsers;

var createUser = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3(req, res) {
    var result, validateInput, _req$body2, name, email, info, existingUser, doc;

    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            result = {
              statusCode: 200,
              message: 'Success'
            };
            _context3.prev = 1;
            _context3.next = 4;
            return validateCreateUser(req.body);

          case 4:
            validateInput = _context3.sent;

            if (!(validateInput !== null && validateInput !== void 0 && validateInput.length)) {
              _context3.next = 7;
              break;
            }

            throw new Error(validateInput.map(function (item) {
              return item.message;
            }).join(','));

          case 7:
            _req$body2 = req.body, name = _req$body2.name, email = _req$body2.email, info = _objectWithoutProperties(_req$body2, _excluded2);
            _context3.next = 10;
            return User.collection.exists({
              $or: [{
                name: name
              }, {
                email: email
              }]
            });

          case 10:
            existingUser = _context3.sent;

            if (!existingUser) {
              _context3.next = 13;
              break;
            }

            throw new Error('Name or email already used');

          case 13:
            _context3.next = 15;
            return User.create(_objectSpread(_objectSpread({}, info), {}, {
              name: name,
              email: email
            }), _configs.default.cache.ttlId);

          case 15:
            doc = _context3.sent;
            if (doc) delete doc.password;
            result.data = doc;
            _context3.next = 24;
            break;

          case 20:
            _context3.prev = 20;
            _context3.t0 = _context3["catch"](1);
            result.statusCode = 404;
            result.message = _context3.t0.message;

          case 24:
            return _context3.abrupt("return", res.status(200).json(result));

          case 25:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 20]]);
  }));

  return function createUser(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.createUser = createUser;