const { isCelebrateError } = require('celebrate');

/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
const errorHandler = (err, req, res, next) => {
  if (err.status) {
    return res.status(err.status).send({ message: err.message });
  } if (isCelebrateError(err)) {
    const errorBody = err.details.get('body') || err.details.get('params');
    const { details: [errorDetails] } = errorBody;
    return res.status(400).send({ message: errorDetails.message });
  }

  res.status(500).send({ message: err.message });
};

module.exports = errorHandler;
