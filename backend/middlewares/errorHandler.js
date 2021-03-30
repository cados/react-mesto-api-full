/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
const errorHandler = (err, req, res, next) => {
  if (err.status) {
    return res.status(err.status).send({ message: err.message });
  }
  res.status(500).send({ message: `Внутренняя ошибка сервера : ${err.message}` });
};

module.exports = errorHandler;
