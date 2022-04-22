"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _generates = require("../../generates");

var _utils = require("../../../utils");

var _excluded = ["_id"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var ModelDataSource = /*#__PURE__*/function (_MongoDataSource) {
  _inherits(ModelDataSource, _MongoDataSource);

  var _super = _createSuper(ModelDataSource);

  function ModelDataSource() {
    _classCallCheck(this, ModelDataSource);

    return _super.apply(this, arguments);
  }

  _createClass(ModelDataSource, [{
    key: "initialize",
    value: function initialize() {
      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _get(_getPrototypeOf(ModelDataSource.prototype), "initialize", this).call(this, _objectSpread(_objectSpread({}, config), {}, {
        allowFlushingCollectionCache: true,
        debug: true
      }));
    }
  }, {
    key: "filterAndPaging",
    value: function () {
      var _filterAndPaging = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(_ref, ttl) {
        var orderBy, query, limit, skip, select, sort, result, _yield$Promise$all, _yield$Promise$all2, docs, countDocument;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                orderBy = _ref.orderBy, query = _ref.query, limit = _ref.limit, skip = _ref.skip, select = _ref.select;
                sort = orderBy;
                result = {};
                _context.next = 5;
                return Promise.all([this.findManyByQueryAndOption({
                  query: query,
                  select: select,
                  option: {
                    sort: sort,
                    limit: limit,
                    skip: skip * limit
                  }
                }, {
                  ttl: ttl
                }), this.collection.countDocuments(query)]);

              case 5:
                _yield$Promise$all = _context.sent;
                _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
                docs = _yield$Promise$all2[0];
                countDocument = _yield$Promise$all2[1];
                result.pageInfo = (0, _utils.getPageInfo)(countDocument, limit, skip);
                result.data = docs;
                return _context.abrupt("return", result);

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function filterAndPaging(_x, _x2) {
        return _filterAndPaging.apply(this, arguments);
      }

      return filterAndPaging;
    }()
  }, {
    key: "create",
    value: function () {
      var _create = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2(input, ttl) {
        var newDoc, saveDoc, cacheDoc;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                newDoc = new this.collection(input);
                _context2.next = 3;
                return newDoc.save();

              case 3:
                saveDoc = _context2.sent;
                _context2.next = 6;
                return this.deleteManyFromQueryCollectionCache();

              case 6:
                _context2.next = 8;
                return this.findOneById(saveDoc._id, {
                  ttl: ttl
                });

              case 8:
                cacheDoc = _context2.sent;
                return _context2.abrupt("return", cacheDoc);

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function create(_x3, _x4) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: "update",
    value: function () {
      var _update = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3(_ref2, ttl) {
        var _id, info, updatedDoc, cacheDoc;

        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _id = _ref2._id, info = _objectWithoutProperties(_ref2, _excluded);
                _context3.next = 3;
                return this.collection.updateOne({
                  _id: _id
                }, _objectSpread({}, info)).lean().exec();

              case 3:
                updatedDoc = _context3.sent;

                if (!(!updatedDoc || updatedDoc && updatedDoc.nModified === 0)) {
                  _context3.next = 6;
                  break;
                }

                throw new Error('Cannot update, plz try update again');

              case 6:
                _context3.next = 8;
                return this.deleteFromCacheById(_id);

              case 8:
                _context3.next = 10;
                return this.deleteManyFromQueryCollectionCache();

              case 10:
                _context3.next = 12;
                return this.findOneById(_id, {
                  ttl: ttl
                });

              case 12:
                cacheDoc = _context3.sent;
                return _context3.abrupt("return", cacheDoc);

              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function update(_x5, _x6) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: "remove",
    value: function () {
      var _remove = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4(_ref3) {
        var _id;

        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _id = _ref3._id;
                _context4.next = 3;
                return this.collection.deleteOne({
                  _id: _id
                });

              case 3:
                _context4.next = 5;
                return this.deleteFromCacheById(_id);

              case 5:
                _context4.next = 7;
                return this.deleteManyFromQueryCollectionCache();

              case 7:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function remove(_x7) {
        return _remove.apply(this, arguments);
      }

      return remove;
    }()
  }]);

  return ModelDataSource;
}(_generates.MongoDataSource);

exports.default = ModelDataSource;