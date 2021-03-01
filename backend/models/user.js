const bcrypt = require('bcryptjs');
const validator = require('validator');
const mongoose = require('mongoose');
const AuthorizationError = require('../errors/auth-error');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: 'Укажите email!',
    },

  },
  password: {
    type: String,
    required: true,
    select: false,
    validate: {
      validator(v) {
        return validator.isStrongPassword(v);
      },
      message: 'Задайте другой пароль!',
    },
    // eslint-disable-next-line no-dupe-keys
    select: false,
  },
  name: { // у пользователя есть имя — опишем требования к имени в схеме:
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
      message: 'Некорректный URL',
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .orFail(new AuthorizationError('Неправильные почта или пароль'))
    .then((user) => bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        throw new AuthorizationError('Неправильные почта или пароль');
      }
      return user;
    }));
};

module.exports = mongoose.model('user', userSchema);
