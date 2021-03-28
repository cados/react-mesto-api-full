const invalidUrl = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');

// invalidUrl.all('*', (req, res, next) => {
//   next(new NotFoundError('Not Found'));
// });

invalidUrl.all('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = invalidUrl;
