const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: [true, 'Поле "country" (страна создания фильма) должно быть заполнено'],
    },
    director: {
      type: String,
      required: [true, 'Поле "director" (режиссёр фильма) должно быть заполнено'],
    },
    duration: {
      type: Number,
      required: [true, 'Поле "duration" (длительность фильма) должно быть заполнено'],
    },
    year: {
      type: String,
      required: [true, 'Поле "year" (год выпуска фильма) должно быть заполнено'],
    },
    description: {
      type: String,
      required: [true, 'Поле "description" (описание фильма) должно быть заполнено'],
    },
    image: {
      type: String,
      required: [true, 'Поле "image" (ссылка на постер к фильму) должно быть заполнено'],
      validate: [isURL, 'Поле "image" (ссылка на постер к фильму) неверно заполнено'],
    },
    trailerLink: {
      type: String,
      required: [true, 'Поле "trailerLink" (ссылка на трейлер фильма) должно быть заполнено'],
      validate: [isURL, 'Поле "trailerLink" (ссылка на трейлер фильма) неверно заполнено'],
    },
    thumbnail: {
      type: String,
      required: [true, 'Поле "thumbnail" (постер к фильму) должно быть заполнено'],
      validate: [isURL, 'Поле "thumbnail" (постер к фильму) неверно заполнено'],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    movieId: {
      type: Number,
      required: [true, 'Поле "movieId" должно быть заполнено'],
    },
    nameRU: {
      type: String,
      required: [true, 'Поле "nameRU" (название фильма на русском языке) должно быть заполнено'],
    },
    nameEN: {
      type: String,
      required: [true, 'Поле "nameEN" (название фильма на английском языке) должно быть заполнено'],
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('movie', movieSchema);
