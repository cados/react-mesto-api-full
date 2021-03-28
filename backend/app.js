require('dotenv').config();
const express = require('express');

const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { login, createUser } = require('./controllers/users');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const invalidUrl = require('./routes/invalidRoutes');
const auth = require('./middlewares/auth');
const { validateLogin, validateUser } = require('./middlewares/validation');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
// const { ServerError, NotFoundError } = require('./errors/index');

const { PORT = 3000 } = process.env;

mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
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

// app.use(auth);

app.use('/', invalidUrl, auth, usersRouter);
app.use('/', invalidUrl, auth, cardsRouter);
// app.use('*', invalidUrl);
// app.use((req, res) => {
//   res.status(404).end('error');
// });

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
