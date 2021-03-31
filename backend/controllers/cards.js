const Card = require('../models/card');
const { BadRequestError, NotFoundError, ConflictError } = require('../errors/index');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch((next));
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(err.message);
      }
    }).catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Нет карточки с таким id');
      }
      if (card.owner.toString() !== req.user._id) {
        throw new ConflictError('Нет прав на удаление карточки');
      } else {
        Card.findByIdAndDelete(req.params.id)
          // eslint-disable-next-line no-shadow
          .then((card) => {
            res.status(200).send(card);
          });
      }
    }).catch(next);
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Картока не найдена');
      }
      res.status(200).send(card);
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Картока не найдена');
      }
      res.status(200).send(card);
    })
    .catch(next);
};

module.exports = {
  getCards, createCard, likeCard, deleteCard, dislikeCard,
};
