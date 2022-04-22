"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MongoDataSource = void 0;

var _apolloDatasource = require("apollo-datasource");

var _apolloServerCaching = require("apollo-server-caching");

var _apolloServerCacheRedis = require("apollo-server-cache-redis");

var _redis = require("../../external-libs/redis");

var _cache = require("./cache");

var _helpers = require("./helpers");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var MongoDataSource = /*#__PURE__*/function (_DataSource) {
  _inherits(MongoDataSource, _DataSource);

  var _super = _createSuper(MongoDataSource);

  function MongoDataSource(collection) {
    var _this;

    _classCallCheck(this, MongoDataSource);

    _this = _super.call(this);

    if (!(0, _helpers.isCollectionOrModel)(collection)) {
      throw new Error('MongoDataSource constructor must be given an object with a single collection');
    }

    _this.collection = collection;
    _this.cache = new _apolloServerCacheRedis.RedisCache(_redis.RedisConfigOption);
    return _this;
  }

  _createClass(MongoDataSource, [{
    key: "initialize",
    value: function initialize() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$context = _ref.context,
          context = _ref$context === void 0 ? {} : _ref$context,
          debug = _ref.debug,
          allowFlushingCollectionCache = _ref.allowFlushingCollectionCache;

      this.context = context;
      var methods = (0, _cache.createCachingMethods)({
        collection: this.collection,
        cache: this.cache || new _apolloServerCaching.InMemoryLRUCache(),
        debug: debug,
        allowFlushingCollectionCache: allowFlushingCollectionCache
      });
      Object.assign(this, methods);
    }
  }]);

  return MongoDataSource;
}(_apolloDatasource.DataSource);

exports.MongoDataSource = MongoDataSource;