import createError from 'http-errors';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';
import path from 'path';

import { connect as connectMongoDB } from './external-libs/mongoose';
import logger from './external-libs/winston';
import routes from './routes';
import config from './configs';

const app = express();

// parse application/json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../app/build')));

let corsOptions = {
  origin(origin, callback) {
    if (!origin || config.cors.whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed access!'));
    }
  }
};

if (!config.cors.allowed) {
  corsOptions = {};
}

app.use(compression());
app.use(cors(corsOptions));
app.use(helmet());

// catch 404 and forward to error handler
app.use((err, req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ message: 'Not allowed access!' });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../app/build/index.html'));
});

app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    name: 'RESTful Service',
    version: '1.0',
    status: 'green'
  });
});

connectMongoDB()
  .then(db => {
    logger.info('Mongo connect successful!');
    // Use Route
    app.use(config.apiPath, routes);
    // The `listen` method launches a web server.
    app.listen(config.port, () => {
      logger.info(`🚀 Server ready at http://localhost:${config.port}`);
      logger.info(`🚀 Server health check at http://localhost:${config.port}/health`);
    });
  })
  .catch(error => {
    logger.error(error);
    process.exit(1);
  });
