"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("../../external-libs/mongoose"));

var _configs = _interopRequireDefault(require("../../configs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(_ref) {
  var schema = _ref.schema,
      modelName = _ref.modelName,
      collectionName = _ref.collectionName;
  return _mongoose.default.model(modelName, new _mongoose.default.Schema(schema, {
    collection: "".concat(_configs.default.mongo.prefix, "_").concat(collectionName),
    versionKey: false,
    strict: false,
    timestamps: true
  }));
};

exports.default = _default;