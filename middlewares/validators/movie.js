const { celebrate, Joi } = require('celebrate');
const { RegExp } = require('../../utils/Constants');

const validatorCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(RegExp),
    trailerLink: Joi.string().required().regex(RegExp),
    thumbnail: Joi.string().required().regex(RegExp),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const validationIdMovie = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().hex().length(24),
  }),
});

module.exports = {
  validatorCreateMovie,
  validationIdMovie,
};
