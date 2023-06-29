const { Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);
const { urlRegular } = require('./constants');

module.exports = Object.freeze({
  JoiBodyEmailPassword: {
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  },
  JoiBodyEmailPasswordName: {
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
      name: Joi.string().min(2).max(30),
    }),
  },
  JoiBodyNameEmail: {
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      email: Joi.string().required().email(),
    }),
  },
  JoiParamsMovieID: {
    params: Joi.object().keys({
      movieId: Joi.objectId().required(),
    }),
  },
  JoiBodyMovieParams: {
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.object().required(),
      trailerLink: Joi.string().required().regex(urlRegular),
      thumbnail: Joi.object().required(),
      movieId: Joi.number().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  },
});
