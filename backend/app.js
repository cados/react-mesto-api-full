const express = require('express');

const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { login, createUser } = require('./controllers/users');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { validateLogin, validateUser } = require('./middlewares/validation');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const { NotFoundError } = require('./errors');
require('dotenv').config();

const { PORT = 3001 } = process.env;

mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', validateLogin, login);
app.post('/signup', validateUser, createUser);

app.use('/', usersRouter);
app.use('/', cardsRouter);

app.use('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден!');
});

app.use(errorLogger);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
