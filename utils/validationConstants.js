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
  JoiBodyName: {
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
    }),
  },
  JoiParamsMovieID: {
    params: Joi.object().keys({
      movieId: Joi.objectId().required(),
    }),
  },
  JoiBodyNameLink: {
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().regex(urlRegular),
    }),
  },
});
