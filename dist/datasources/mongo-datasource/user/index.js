"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _model = _interopRequireDefault(require("./model"));

var _schema = _interopRequireDefault(require("./schema"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var newModel = new _model.default(_schema.default);
newModel.initialize();
var _default = newModel;
exports.default = _default;