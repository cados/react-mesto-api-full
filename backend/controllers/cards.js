const Card = require('../models/card');
const { BadRequest, ServerError, NotFound } = require('../errors/index');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      if (cards.length === 0) {
        res.send({ message: 'Нет карточек' });
        return;
      }
      res.status(200).send(cards);
    })
    .catch((err) => {
      throw new ServerError({ message: `Внутренняя ошибка сервера: ${err}` });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequest({ message: `Введены некорректные данные: ${err}` });
      } else {
        throw new ServerError({ message: `Внутренняя ошибка сервера: ${err}` });
      }
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error('NotValidId'))
    .then((likes) => {
      res.status(200).send(likes);
    })
    .catch((err) => {
      if (err.message === 'NotValidId') {
        throw new NotFound({ message: 'Нет пользователя с таким Id' });
      } else if (err.name === 'CastError') {
        throw new BadRequest({ message: `Введены некорректные данные: ${err}` });
      } else {
        throw new ServerError({ message: `Внутренняя ошибка сервера: ${err}` });
      }
    });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (!card) {
        throw new NotFound('Нет карточки с таким id');
      }
      if (card.owner.toString() !== req.user._id) {
        throw new BadRequest('Нет прав на удаление карточки');
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
        throw new NotFound({ message: 'Нет пользователя с таким Id' });
      } else if (err.name === 'CastError') {
        throw new BadRequest({ message: `Введены некорректные данные: ${err.name}` });
      } else {
        throw new ServerError({ message: `Внутренняя ошибка сервера: ${err}` });
      }
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error('NotValidId'))
    .then((likes) => {
      res.status(200).send(likes);
    })
    .catch((err) => {
      if (err.message === 'NotValidId') {
        throw new NotFound({ message: `Нет пользователя с таким Id: ${err}` });
      } else if (err.name === 'CastError') {
        throw new BadRequest({ message: `Введены некорректные данные: ${err}` });
      } else {
        throw new ServerError({ message: `Внутренняя ошибка сервера: ${err}` });
      }
    });
};

module.exports = {
  getCards, createCard, likeCard, deleteCard, dislikeCard,
};
