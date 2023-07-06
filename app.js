require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const router = require('./routes');
const handlerError = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const limiter = require('./middlewares/limiter');

const { PORT = 3000, DB_ADDRESS = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

const app = express();

mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
});

app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(limiter);
app.use(cors);

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(handlerError);

app.listen(PORT);
