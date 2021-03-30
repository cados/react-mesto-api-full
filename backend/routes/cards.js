const cardsRouter = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getCards, createCard, likeCard, deleteCard, dislikeCard,
} = require('../controllers/cards');

const {
  validateCard,
  validateId,
} = require('../middlewares/validation');

cardsRouter.get('/cards', auth, getCards);
cardsRouter.post('/cards', auth, validateCard, createCard);
cardsRouter.put('/cards/:id/likes', auth, validateId, likeCard);
cardsRouter.delete('/cards/:id', auth, validateId, deleteCard);
cardsRouter.delete('/cards/:id/likes', auth, validateId, dislikeCard);

module.exports = cardsRouter;
