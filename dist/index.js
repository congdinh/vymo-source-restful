"use strict";

var _httpErrors = _interopRequireDefault(require("http-errors"));

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _compression = _interopRequireDefault(require("compression"));

var _helmet = _interopRequireDefault(require("helmet"));

var _path = _interopRequireDefault(require("path"));

var _mongoose = require("./external-libs/mongoose");

var _winston = _interopRequireDefault(require("./external-libs/winston"));

var _routes = _interopRequireDefault(require("./routes"));

var _configs = _interopRequireDefault(require("./configs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)(); // parse application/json

app.use(_bodyParser.default.urlencoded({
  extended: false
}));
app.use(_bodyParser.default.json());
app.use(_express.default.static(_path.default.join(__dirname, '../app/build')));
var corsOptions = {
  origin: function origin(_origin, callback) {
    if (!_origin || _configs.default.cors.whitelist.indexOf(_origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed access!'));
    }
  }
};

if (!_configs.default.cors.allowed) {
  corsOptions = {};
}

app.use((0, _compression.default)());
app.use((0, _cors.default)(corsOptions));
app.use((0, _helmet.default)()); // catch 404 and forward to error handler

app.use(function (err, req, res, next) {
  next((0, _httpErrors.default)(404));
}); // error handler

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // render the error page

  res.status(err.status || 500);
  res.json({
    message: 'Not allowed access!'
  });
});
app.get('/', function (req, res) {
  res.sendFile(_path.default.join(__dirname, '../app/build/index.html'));
});
app.get('/health', function (req, res) {
  res.status(200).json({
    success: true,
    name: 'RESTful Service',
    version: '1.0',
    status: 'green'
  });
});
(0, _mongoose.connect)().then(function (db) {
  _winston.default.info('Mongo connect successful!'); // Use Route


  app.use(_configs.default.apiPath, _routes.default); // The `listen` method launches a web server.

  app.listen(_configs.default.port, function () {
    _winston.default.info("\uD83D\uDE80 Server ready at http://localhost:".concat(_configs.default.port));

    _winston.default.info("\uD83D\uDE80 Server health check at http://localhost:".concat(_configs.default.port, "/health"));
  });
}).catch(function (error) {
  _winston.default.error(error);

  process.exit(1);
});