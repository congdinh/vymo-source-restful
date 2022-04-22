"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isObject = exports.getPageInfo = exports.cleanObject = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var cleanObject = function cleanObject(object) {
  Object.entries(object).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        k = _ref2[0],
        v = _ref2[1];

    if (v && _typeof(v) === 'object') cleanObject(v);

    if (v && _typeof(v) === 'object' && !Object.keys(v).length || v === null || v === undefined || v.length === 0) {
      if (Array.isArray(object)) object.splice(k, 1);else if (!(v instanceof Date)) delete object[k];
    }
  });
  return object;
};

exports.cleanObject = cleanObject;

var getPageInfo = function getPageInfo(docCount, limit, skip) {
  var totalPage = limit > 0 ? Math.ceil(docCount / limit) || 1 : 0; // const currentPage = Math.ceil((skip + 1) / limit);

  var currentPage = skip + 1;
  return {
    limit: limit,
    totalDocs: docCount,
    totalPage: totalPage,
    currentPage: currentPage,
    hasNextPage: currentPage < totalPage,
    hasPreviousPage: currentPage > 1
  };
};

exports.getPageInfo = getPageInfo;

var isObject = function isObject(item) {
  return _typeof(item) === 'object' && !Array.isArray(item) && item !== null;
};

exports.isObject = isObject;