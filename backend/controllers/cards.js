const Card = require('../models/card');
const BadRequestError = require('../errors/bad-req-err');
const ServerError = require('../errors/serv-err');
const NotFoundError = require('../errors/not-found-err');

const getCards = (req, res) => Card.find({})
  .then((cards) => res.status(200).send(cards))
  .catch((err) => res.status(500).send(err));

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError({ message: `Введены некорректные данные: ${err}` });
      } else {
        throw new ServerError({ message: `Внутренняя ошибка сервера: ${err}` });
      }
    });
};

const deleteCard = (req, res, next) => {
  console.log(req.params);
  Card.findById(req.params.id)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Нет карточки с таким id');
      }
      if (card.owner.toString() !== req.user._id) {
        throw new BadRequestError('Нет прав на удаление карточки');
      } else {
        Card.findByIdAndDelete(req.params.id)
          // eslint-disable-next-line no-shadow
          .then((card) => {
            res.status(200).send(card);
          })
          .catch(next);
      }
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        throw new NotFoundError({ message: 'Нет пользователя с таким Id' });
      } else if (err.name === 'CastError') {
        throw new BadRequestError({ message: `Введены некорректные данные: ${err.name}` });
      } else {
        throw new ServerError({ message: `Внутренняя ошибка сервера: ${err}` });
      }
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(new Error('NotValidId'))
    .then((likes) => {
      res.status(200).send(likes);
    })
    .catch((err) => {
      if (err.message === 'NotValidId') {
        throw new NotFoundError({ message: 'Нет пользователя с таким Id' });
      } else if (err.name === 'CastError') {
        throw new BadRequestError({ message: `Введены некорректные данные: ${err}` });
      } else {
        throw new ServerError({ message: `Внутренняя ошибка сервера: ${err}` });
      }
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(new Error('NotValidId'))
    .then((likes) => {
      res.status(200).send(likes);
    })
    .catch((err) => {
      if (err.message === 'NotValidId') {
        throw new NotFoundError({ message: `Нет пользователя с таким Id: ${err}` });
      } else if (err.name === 'CastError') {
        throw new BadRequestError({ message: `Введены некорректные данные: ${err}` });
      } else {
        throw new ServerError({ message: `Внутренняя ошибка сервера: ${err}` });
      }
    });
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
