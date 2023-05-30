// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();

console.log(process.env);
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
/* const { rateLimiterUsingThirdParty } = require('./middlewares/rateLimit'); */
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const { PORT = 3000 } = process.env;
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

const app = express();
app.use(cors());
// подключаем логгер запросов
app.use(requestLogger);
app.use(bodyParser.json());
app.use(helmet());
/* app.use(rateLimiterUsingThirdParty); */
app.use(router);
// подключаем логгер ошибок
app.use(errorLogger);
app.use(errors());

app.use(errorHandler);
app.listen(PORT);
