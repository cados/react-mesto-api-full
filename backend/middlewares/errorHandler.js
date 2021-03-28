// const { Joi } = require('celebrate');

/* eslint-disable consistent-return */
// eslint-disable-next-line no-unused-vars
// const errorHandler = (err, req, res, next) => {
//   // console.log(err);
//   if (err instanceof CelebrateError) {
//     return
//   }
//   if (err.status) {
//     return res.status(err.status).send({ message: err.message });
//   }
//   res.status(500).send({ message: err.message });
// };

// module.exports = errorHandler;
// const { err, value } = Joi.validate(data, schema);

const errorHandler = (err, req, res, next) => {
  // console.log(err);

  // if (err) {
  //   console.log(err);
  // }
  if (err.status) {
    return res.status(err.status).send({ message: err.message });
  }
  res.status(500).send({ message: err.message });
};

module.exports = errorHandler;
