"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCachingMethods = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _dataloader = _interopRequireDefault(require("dataloader"));

var _mongoose = require("mongoose");

var _sift = _interopRequireDefault(require("sift"));

var _crypto = _interopRequireDefault(require("crypto"));

var _helpers = require("./helpers");

var _winston = _interopRequireDefault(require("../../external-libs/winston"));

var _excluded = ["select", "option"],
    _excluded2 = ["select", "option"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var isDocContainsData = function isDocContainsData(doc) {
  return doc && !Array.isArray(doc) || doc && Array.isArray(doc) && doc.length > 0;
};

var handleCache = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(_ref) {
    var ttl, doc, key, cache;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            ttl = _ref.ttl, doc = _ref.doc, key = _ref.key, cache = _ref.cache;

            if (isDocContainsData(doc) && key && Number.isInteger(ttl)) {
              cache.set(key, JSON.stringify(doc), {
                ttl: ttl
              });
            }

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function handleCache(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var orderDocs = function orderDocs(ids) {
  return function (docs) {
    var idMap = {};
    docs.forEach(function (doc) {
      idMap[doc._id] = doc;
    });
    return ids.map(function (id) {
      return idMap[id];
    });
  };
};

var createCachingMethods = function createCachingMethods(_ref3) {
  var collection = _ref3.collection,
      cache = _ref3.cache,
      _ref3$allowFlushingCo = _ref3.allowFlushingCollectionCache,
      allowFlushingCollectionCache = _ref3$allowFlushingCo === void 0 ? false : _ref3$allowFlushingCo,
      _ref3$debug = _ref3.debug,
      debug = _ref3$debug === void 0 ? false : _ref3$debug;
  var isRedis = typeof cache.store === 'undefined';
  var isMongoose = typeof collection === 'function';
  var loader = new _dataloader.default(function (ids) {
    return isMongoose ? collection.find({
      _id: {
        $in: ids
      }
    }).lean().then(orderDocs(ids)) : collection.find({
      _id: {
        $in: ids
      }
    }).toArray().then(orderDocs(ids));
  });
  var cachePrefix = "mongo:".concat((0, _helpers.getCollection)(collection).collectionName, ":");
  var cachePrefixQueryOption = "".concat(cachePrefix, "query:");
  var dataQuery = isMongoose ? function (_ref4) {
    var queries = _ref4.queries;
    return collection.find({
      $or: queries
    }).collation({
      locale: 'en'
    }).lean().then(function (items) {
      return queries.map(function (query) {
        return items.filter((0, _sift.default)(query));
      });
    });
  } : function (_ref5) {
    var queries = _ref5.queries;
    return collection.find({
      $or: queries
    }).collation({
      locale: 'en'
    }).toArray().then(function (items) {
      return queries.map(function (query) {
        return items.filter((0, _sift.default)(query));
      });
    });
  };
  var queryLoader = new _dataloader.default(function (queries) {
    return dataQuery({
      queries: queries
    });
  }); // Dataloader query with options

  var dataQueryWithOption = function dataQueryWithOption(_ref6) {
    var queries = _ref6.queries;
    var filter = queries.map(function (query) {
      var select = query.select,
          option = query.option,
          other = _objectWithoutProperties(query, _excluded);

      return other.query;
    });
    var select = queries && queries[0] && queries[0].select || null;
    var option = queries && queries[0] && queries[0].option || null;
    return collection.find({
      $or: filter
    }, select, option).collation({
      locale: 'en'
    }).lean().then(function (items) {
      return queries.map(function (query) {
        var select = query.select,
            option = query.option,
            other = _objectWithoutProperties(query, _excluded2);

        return items.filter((0, _sift.default)(other.query));
      });
    });
  };

  var queryWithOptionLoader = new _dataloader.default(function (queries) {
    return dataQueryWithOption({
      queries: queries
    });
  });
  var methods = {
    aggregation: function () {
      var _aggregation = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2(body, _ref7) {
        var ttl, hashQuery, key, cacheDoc, doc;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                ttl = _ref7.ttl;
                hashQuery = _crypto.default.createHash('md5').update(JSON.stringify(body)).digest('hex');
                key = cachePrefix + hashQuery;
                _context2.next = 5;
                return cache.get(key);

              case 5:
                cacheDoc = _context2.sent;

                if (!cacheDoc) {
                  _context2.next = 8;
                  break;
                }

                return _context2.abrupt("return", JSON.parse(cacheDoc));

              case 8:
                _context2.next = 10;
                return collection.aggregate(body);

              case 10:
                doc = _context2.sent;
                _context2.next = 13;
                return handleCache({
                  ttl: ttl,
                  doc: doc,
                  key: key,
                  cache: cache
                });

              case 13:
                return _context2.abrupt("return", doc);

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function aggregation(_x2, _x3) {
        return _aggregation.apply(this, arguments);
      }

      return aggregation;
    }(),
    findOneById: function () {
      var _findOneById = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3(id) {
        var _ref8,
            ttl,
            key,
            cacheDoc,
            doc,
            _args3 = arguments;

        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _ref8 = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {}, ttl = _ref8.ttl;

                if (id) {
                  _context3.next = 3;
                  break;
                }

                return _context3.abrupt("return", null);

              case 3:
                if ((0, _mongoose.isValidObjectId)(id)) {
                  _context3.next = 5;
                  break;
                }

                throw new Error('Invalid ID');

              case 5:
                key = cachePrefix + id;
                _context3.next = 8;
                return cache.get(key);

              case 8:
                cacheDoc = _context3.sent;

                _winston.default.debug('Caching', "KEY: ".concat(key, ", ").concat(cacheDoc ? 'cache' : 'miss'));

                if (!cacheDoc) {
                  _context3.next = 12;
                  break;
                }

                return _context3.abrupt("return", JSON.parse(cacheDoc));

              case 12:
                _context3.next = 14;
                return loader.load(id);

              case 14:
                doc = _context3.sent;
                _context3.next = 17;
                return handleCache({
                  ttl: ttl,
                  doc: doc,
                  key: key,
                  cache: cache
                });

              case 17:
                _context3.next = 19;
                return loader.clear(id);

              case 19:
                return _context3.abrupt("return", doc);

              case 20:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function findOneById(_x4) {
        return _findOneById.apply(this, arguments);
      }

      return findOneById;
    }(),
    saveCache: function () {
      var _saveCache = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4(key, value) {
        var ttl,
            _args4 = arguments;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                ttl = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : {};
                return _context4.abrupt("return", cache.set(key, value, ttl));

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function saveCache(_x5, _x6) {
        return _saveCache.apply(this, arguments);
      }

      return saveCache;
    }(),
    getCache: function () {
      var _getCache = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee5(key) {
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt("return", cache.get(key));

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function getCache(_x7) {
        return _getCache.apply(this, arguments);
      }

      return getCache;
    }(),
    delCache: function () {
      var _delCache = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee6(key) {
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                return _context6.abrupt("return", cache.delete(key));

              case 1:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function delCache(_x8) {
        return _delCache.apply(this, arguments);
      }

      return delCache;
    }(),
    findManyByIds: function findManyByIds(ids) {
      var _ref9 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          ttl = _ref9.ttl;

      return (ids === null || ids === void 0 ? void 0 : ids.length) && Promise.all(ids.map(function (id) {
        return methods.findOneById(id, {
          ttl: ttl
        });
      })).then(function (result) {
        return result.filter(function (i) {
          return i;
        });
      }) || [];
    },
    findManyByQuery: function () {
      var _findManyByQuery = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee7() {
        var query,
            _ref10,
            ttl,
            key,
            cacheDocs,
            docs,
            _args7 = arguments;

        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                query = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : {};
                _ref10 = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : {}, ttl = _ref10.ttl;
                key = cachePrefixQueryOption + JSON.stringify(query);
                _context7.next = 5;
                return cache.get(key);

              case 5:
                cacheDocs = _context7.sent;

                _winston.default.warn("Caching ".concat(key, " - ").concat(cacheDocs ? 'cache' : 'miss'));

                if (!cacheDocs) {
                  _context7.next = 9;
                  break;
                }

                return _context7.abrupt("return", JSON.parse(cacheDocs));

              case 9:
                _context7.next = 11;
                return queryLoader.load(query);

              case 11:
                docs = _context7.sent;
                _context7.next = 14;
                return handleCache({
                  ttl: ttl,
                  doc: docs,
                  key: key,
                  cache: cache
                });

              case 14:
                return _context7.abrupt("return", docs);

              case 15:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function findManyByQuery() {
        return _findManyByQuery.apply(this, arguments);
      }

      return findManyByQuery;
    }(),
    // Find Many by query and option
    findManyByQueryAndOption: function () {
      var _findManyByQueryAndOption = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee8(_ref11) {
        var _ref11$query,
            query,
            _ref11$select,
            select,
            _ref11$option,
            option,
            _ref12,
            ttl,
            key,
            cacheDocs,
            docs,
            _args8 = arguments;

        return _regenerator.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _ref11$query = _ref11.query, query = _ref11$query === void 0 ? {} : _ref11$query, _ref11$select = _ref11.select, select = _ref11$select === void 0 ? null : _ref11$select, _ref11$option = _ref11.option, option = _ref11$option === void 0 ? {} : _ref11$option;
                _ref12 = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : {}, ttl = _ref12.ttl;
                key = cachePrefixQueryOption + JSON.stringify({
                  query: query,
                  select: select,
                  option: option
                });
                _context8.next = 5;
                return cache.get(key);

              case 5:
                cacheDocs = _context8.sent;

                _winston.default.warn("Caching ".concat(key, " - ").concat(cacheDocs ? 'cache' : 'miss'));

                if (!cacheDocs) {
                  _context8.next = 9;
                  break;
                }

                return _context8.abrupt("return", JSON.parse(cacheDocs));

              case 9:
                _context8.next = 11;
                return queryWithOptionLoader.load({
                  query: query,
                  select: select,
                  option: option
                });

              case 11:
                docs = _context8.sent;
                _context8.next = 14;
                return handleCache({
                  ttl: ttl,
                  doc: docs,
                  key: key,
                  cache: cache
                });

              case 14:
                return _context8.abrupt("return", docs);

              case 15:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function findManyByQueryAndOption(_x9) {
        return _findManyByQueryAndOption.apply(this, arguments);
      }

      return findManyByQueryAndOption;
    }(),
    deleteFromCacheById: function () {
      var _deleteFromCacheById = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee9(id) {
        var key;
        return _regenerator.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                key = id && _typeof(id) === 'object' ? JSON.stringify(id) : id; // NEW

                if (debug) {
                  console.log("Deleted ".concat(cachePrefix + key));
                }

                _context9.next = 4;
                return cache.delete(cachePrefix + key);

              case 4:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }));

      function deleteFromCacheById(_x10) {
        return _deleteFromCacheById.apply(this, arguments);
      }

      return deleteFromCacheById;
    }(),
    // this works also for byQueries just passing a stringified query as the id
    deleteFromCacheByIds: function () {
      var _deleteFromCacheByIds = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee10(ids) {
        return _regenerator.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                Promise.all(ids.map(function (id) {
                  return methods.deleteFromCacheById(id);
                }));

              case 1:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }));

      function deleteFromCacheByIds(_x11) {
        return _deleteFromCacheByIds.apply(this, arguments);
      }

      return deleteFromCacheByIds;
    }(),
    deleteFromCachedByQuery: function () {
      var _deleteFromCachedByQuery = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee11(query) {
        var key;
        return _regenerator.default.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                key = cachePrefix + JSON.stringify(query);
                _context11.next = 3;
                return cache.delete(key);

              case 3:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11);
      }));

      function deleteFromCachedByQuery(_x12) {
        return _deleteFromCachedByQuery.apply(this, arguments);
      }

      return deleteFromCachedByQuery;
    }(),
    // eslint-disable-next-line no-param-reassign
    deleteManyFromQueryCollectionCache: function () {
      var _deleteManyFromQueryCollectionCache = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee12() {
        var redis, stream;
        return _regenerator.default.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                if (!isRedis) {
                  _context12.next = 6;
                  break;
                }

                redis = cache.client;
                stream = redis.scanStream({
                  match: "".concat(cachePrefixQueryOption, "*")
                });
                stream.on('data', function (keys) {
                  // `keys` is an array of strings representing key names
                  if (keys.length) {
                    var pipeline = redis.pipeline();
                    keys.forEach(function (key) {
                      pipeline.del(key);

                      if (debug) {
                        console.log('KEY', key, 'deleted');
                      }
                    });
                    pipeline.exec();
                  }
                });
                stream.on('end', function () {
                  if (debug) {
                    console.log("Deleted ".concat(cachePrefixQueryOption, "*"));
                  }
                });
                return _context12.abrupt("return", 'ok');

              case 6:
                return _context12.abrupt("return", null);

              case 7:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12);
      }));

      function deleteManyFromQueryCollectionCache() {
        return _deleteManyFromQueryCollectionCache.apply(this, arguments);
      }

      return deleteManyFromQueryCollectionCache;
    }(),
    // eslint-disable-next-line no-param-reassign
    deleteManyFromPatternKeyCollectionCache: function () {
      var _deleteManyFromPatternKeyCollectionCache = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee13(patternKey) {
        var matchKey, redis, stream;
        return _regenerator.default.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                matchKey = "".concat(cachePrefix).concat(patternKey, "*");

                if (!isRedis) {
                  _context13.next = 7;
                  break;
                }

                redis = cache.client;
                stream = redis.scanStream({
                  match: matchKey
                });
                stream.on('data', function (keys) {
                  // `keys` is an array of strings representing key names
                  if (keys.length) {
                    var pipeline = redis.pipeline();
                    keys.forEach(function (key) {
                      pipeline.del(key);

                      if (debug) {
                        console.log('KEY', key, 'deleted');
                      }
                    });
                    pipeline.exec();
                  }
                });
                stream.on('end', function () {
                  if (debug) {
                    console.log("Deleted ".concat(matchKey));
                  }
                });
                return _context13.abrupt("return", 'ok');

              case 7:
                return _context13.abrupt("return", null);

              case 8:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13);
      }));

      function deleteManyFromPatternKeyCollectionCache(_x13) {
        return _deleteManyFromPatternKeyCollectionCache.apply(this, arguments);
      }

      return deleteManyFromPatternKeyCollectionCache;
    }(),
    // eslint-disable-next-line no-param-reassign
    deleteManyCacheByPatternKey: function () {
      var _deleteManyCacheByPatternKey = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee14(patternKey) {
        var matchKey, redis, stream;
        return _regenerator.default.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                matchKey = "".concat(patternKey, "*");

                if (!isRedis) {
                  _context14.next = 7;
                  break;
                }

                redis = cache.client;
                stream = redis.scanStream({
                  match: matchKey
                });
                stream.on('data', function (keys) {
                  // `keys` is an array of strings representing key names
                  if (keys.length) {
                    var pipeline = redis.pipeline();
                    keys.forEach(function (key) {
                      pipeline.del(key);

                      if (debug) {
                        console.log('KEY', key, 'deleted');
                      }
                    });
                    pipeline.exec();
                  }
                });
                stream.on('end', function () {
                  if (debug) {
                    console.log("Deleted ".concat(matchKey));
                  }
                });
                return _context14.abrupt("return", 'ok');

              case 7:
                return _context14.abrupt("return", null);

              case 8:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14);
      }));

      function deleteManyCacheByPatternKey(_x14) {
        return _deleteManyCacheByPatternKey.apply(this, arguments);
      }

      return deleteManyCacheByPatternKey;
    }(),
    // eslint-disable-next-line no-param-reassign
    flushCollectionCache: function () {
      var _flushCollectionCache = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee15() {
        var redis, stream;
        return _regenerator.default.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                if (allowFlushingCollectionCache) {
                  _context15.next = 2;
                  break;
                }

                return _context15.abrupt("return", null);

              case 2:
                if (!isRedis) {
                  _context15.next = 8;
                  break;
                }

                redis = cache.client;
                stream = redis.scanStream({
                  match: "".concat(cachePrefix, "*")
                });
                stream.on('data', function (keys) {
                  // `keys` is an array of strings representing key names
                  if (keys.length) {
                    var pipeline = redis.pipeline();
                    keys.forEach(function (key) {
                      pipeline.del(key);

                      if (debug) {
                        console.log('KEY', key, 'flushed');
                      }
                    });
                    pipeline.exec();
                  }
                });
                stream.on('end', function () {
                  if (debug) {
                    console.log("Flushed ".concat(cachePrefix, "*"));
                  }
                });
                return _context15.abrupt("return", 'ok');

              case 8:
                return _context15.abrupt("return", null);

              case 9:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15);
      }));

      function flushCollectionCache() {
        return _flushCollectionCache.apply(this, arguments);
      }

      return flushCollectionCache;
    }()
  };
  return methods;
};

exports.createCachingMethods = createCachingMethods;