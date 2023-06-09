const mongoose = require('mongoose');
const Movie = require('../models/movie');
const NotFoundError = require('../utils/errors/not-found-err');
const BadRequestError = require('../utils/errors/bad-request-err');
const ForbiddenError = require('../utils/errors/forbidden-err');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .populate(['owner'])
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director, duration, year, description, image, trailerLink, nameRU, nameEN, thumbnail, movieId,
  } = req.body;
  const userId = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: userId,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        const message = Object.values(err.errors).map((error) => error.message).join('; ');
        next(new BadRequestError(message));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovieById = (req, res, next) => {
  Movie.findById({ _id: req.params.movieId })
    .populate(['owner'])
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм не найден');
      } else if (!(req.user._id === movie.owner._id.toString())) {
        throw new ForbiddenError('Запрещено удалять чужие фильмы');
      } else {
        movie.deleteOne()
          .then((myMovie) => {
            res.status(200).send({ myMovie });
          })
          .catch(next);
      }
    })
    .catch(next);
};
