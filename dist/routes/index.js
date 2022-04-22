"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _userRoute = _interopRequireDefault(require("./user.route.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = (0, _express.Router)();
routes.use('/users', (0, _userRoute.default)());
var _default = routes;
exports.default = _default;