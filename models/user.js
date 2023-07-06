// Импорт пакетов
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UnauthorizedError = require('../errors/UnauthorizedError');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Не передан e-mail пользователя'],
      unique: true,
      validate: {
        validator: (email) => validator.isEmail(email),
        message: 'Некорректный e-mail адрес',
      },
    },
    password: {
      type: String,
      required: [true, 'Не передан пароль пользователя'],
      select: false,
    },
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
  },
  { toJSON: { useProjection: true }, toObject: { useProjection: true }, versionKey: false },
);

userSchema.statics.findUserByCredentials = function findUser(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError('Неверная почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError('Неверная почта или пароль'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
