"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _isEmail = _interopRequireDefault(require("validator/lib/isEmail"));

var _isMobilePhone = _interopRequireDefault(require("validator/lib/isMobilePhone"));

var _generateModel = _interopRequireDefault(require("../../generates/generateModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = {
  name: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: [true, 'Name required'],
    minlength: [3, 'Minimum name length 3 characters'],
    maxlength: [30, 'Minimum name length 30 characters']
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    required: [true, 'Email required'],
    validate: [_isEmail.default, 'Invalid email']
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone required'],
    minlength: [10, 'Minimum phone length 10 characters'],
    validate: [_isMobilePhone.default, 'Invalid phone number']
  },
  address: {
    type: String,
    required: [true, 'Address required']
  },
  dob: {
    type: String,
    required: [true, 'DOB required']
  }
};

var _default = (0, _generateModel.default)({
  schema: schema,
  modelName: 'User',
  collectionName: 'users'
});

exports.default = _default;