require('dotenv').config();

console.log(process.env.NODE_ENV);
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const router = require('./routes/index');
const centralError = require('./middlewares/centralError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb')
  .then(() => console.log('Подключено к MongoDB'))
  .catch((err) => {
    console.error('Ошибка подключения к MongoDB:', err);
  });

app.use(express.json());

app.use(helmet());

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(centralError);

app.listen(PORT, () => {
  console.log('Server started on port 3000');
});
