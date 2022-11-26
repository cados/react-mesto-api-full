const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({ 'string.min': 'Минимальная длина поля name - 2' }),
    about: Joi.string().min(2).max(30).messages({ 'string.min': 'Минимальная длина поля about - 2' }),
    avatar: Joi.string()
      .custom((value, helpers) => (validator.isURL(value)
        ? value
        : helpers.message('Поле avatar должно быть валидным url-адресом')))
      .messages({
        'string.empty': 'Поле avatar должно быть заполнено',
      }),
    email: Joi.string().required().email().message('Не верный формат email'),
    password: Joi.string().required().min(5).max(20)
      .messages({ 'string.min': 'Минимальная длина пароля - 5' }),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().message('Не верный формат email'),
    password: Joi.string().required().min(5).max(20)
      .messages({ 'string.min': 'Минимальная длина пароля - 5' }),
  }),
});

const validateUpdateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({ 'string.min': 'Минимальная длина поля name - 2' }),
    about: Joi.string().required().min(2).max(30)
      .messages({ 'string.min': 'Минимальная длина поля about - 2' }),
  }),
});

const validateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string()
      .required()
      .custom((value, helpers) => (validator.isURL(value)
        ? value
        : helpers.message('Поле avatar должно быть валидным url-адресом')))
      .messages({
        'string.empty': 'Поле avatar должно быть заполнено',
      }),
  }),
});

const validateId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).message('Не верный формат id')
      .required(),
  }),
});

const validateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({ 'string.min': 'Минимальная длина поля name - 2' })
      .messages({
        'string.empty': 'Поле name должно быть заполнено',
      }),
    link: Joi.string()
      .required()
      .custom((value, helpers) => (validator.isURL(value)
        ? value
        : helpers.message('Поле link должно быть валидным url-адресом')))
      .messages({
        'string.empty': 'Поле link должно быть заполнено',
      }),
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
