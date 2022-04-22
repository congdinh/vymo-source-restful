"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isModel = exports.isCollectionOrModel = exports.getCollection = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var TYPEOF_COLLECTION = "object";

var isModel = function isModel(x) {
  return Boolean(x && x.name === "model");
};

exports.isModel = isModel;

var isCollectionOrModel = function isCollectionOrModel(x) {
  return Boolean(x && (_typeof(x) === TYPEOF_COLLECTION || isModel(x)));
};

exports.isCollectionOrModel = isCollectionOrModel;

var getCollection = function getCollection(x) {
  return isModel(x) ? x.collection : x;
};

exports.getCollection = getCollection;