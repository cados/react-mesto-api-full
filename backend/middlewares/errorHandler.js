const { isCelebrateError } = require('celebrate');

const errorHandler = (err, req, res, next) => {
  if (err.status) {
    return res.status(err.status).send({ message: err.message });
  } if (isCelebrateError(err)) {
    const errorBody = err.details.get('body') || err.details.get('params');
    const { details: [errorDetails] } = errorBody;
    return res.status(400).send({ message: errorDetails.message });
  }

  return res.status(500).send({ message: err.message });
};

module.exports = errorHandler;
