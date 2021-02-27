const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { BadRequest, ServerError, NotFound } = require('../errors/index');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send(user))
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  User.create({
    name, about, avatar, email,
  });
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    }))
    .catch((err) => {
      if (err.name === 'MongoError' || err.code === 11000) {
        throw new BadRequest('Пользователь с таким email уже существует');
      } else next(err);
    })
    .then((user) => res.status(201).send({
      data: {
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      },
    }))
    .catch(next);
};

const getUserId = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new Error('NotValidId'))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.message === 'NotValidId') {
        throw new NotFound('Нет пользователя с таким Id');
      } else if (err.name === 'CastError') {
        throw new BadRequest('Введены некорректные данные');
      } else {
        throw new ServerError({ message: `Внутренняя ошибка сервера: ${err}` });
      }
    })
    .catch(next);
};

const updateUser = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      about: req.body.about,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail()
    .then((newUser) => {
      res.status(200).send(newUser);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequest({ message: `Ошибка при валидации: ${err}` });
      } else if (err.name === 'DocumentNotFoundError') {
        throw new NotFound({ message: `id пользователя не найден! ${err}` });
      } else {
        throw new ServerError({ message: `Внутренняя ошибка сервера: ${err}` });
      }
    });
};

const updateAvatar = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      avatar: req.body.avatar,
    },

    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new BadRequest({ message: 'Ошибка при валидации.' }))
    .then((newAvatar) => {
      res.status(200).send(newAvatar);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequest({ message: `Ошибка при валидации: ${err}` });
      } else if (err.name === 'DocumentNotFoundError') {
        throw new NotFound({ message: `id пользователя не найден! ${err}` });
      } else {
        throw new ServerError({ message: `Внутренняя ошибка сервера: ${err}` });
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' },
      );
      res.send({ token: token.toString() });
    })
    .catch(next);
};

module.exports = {
  getUsers, createUser, getUserId, updateUser, updateAvatar, login, getCurrentUser,
};
