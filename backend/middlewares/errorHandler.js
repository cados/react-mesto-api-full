/* eslint-disable consistent-return */
const errorHandler = (err, req, res) => {
  if (err.status) {
    return res.status(err.status).send({ message: err.message });
  }
  res.status(500).send({ message: `Внутренняя ошибка сервера : ${err.message}` });
};

module.exports = errorHandler;
