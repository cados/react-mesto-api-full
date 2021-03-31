/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
const errorHandler = (err, req, res, next) => {
  if (err.kind === 'ObjectId') {
    return res.status(400).send({ message: 'Не верный формат id' });
  }
  res.status(500).send({ message: err.message });
};

module.exports = errorHandler;
