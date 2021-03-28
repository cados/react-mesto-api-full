const { celebrate, Joi, CelebrateError } = require('celebrate');
const validator = require('validator');

const validateUrl = (value) => {
  if (!validator.isURL(value)) {
    throw new CelebrateError('Некорректный URL');
  }
  return value;
};

const validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validateUrl),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5).max(20),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5).max(20),
  }),
});

const validateUpdateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const validateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom(validateUrl).required(),
  }),
});

// const validateId = celebrate({
//   params: Joi.object().keys({
//     id: Joi.string().hex().length(24).required()
//       .messages({
//         'string.length': 'неверный id',
//       }),
//   }),
// });

const validateId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).message('не верный id')
      .required(),
  }),
});

const validateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().custom(validateUrl).required(),
  }),
});

module.exports = {
  validateUser,
  validateLogin,
  validateUpdateProfile,
  validateAvatar,
  validateId,
  validateCard,
};
