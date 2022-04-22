"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _user = require("../controllers/user.controller");

var router = (0, _express.Router)();

var _default = function _default() {
  /** GET /api/users - Get list of users */
  router.get('/', _user.getUser);
  /** POST /api/users - Create new user */

  router.post('/', _user.createUser);
  return router;
};

exports.default = _default;