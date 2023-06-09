const router = require('express').Router();
const { celebrate } = require('celebrate');

const { JoiParamsMovieID, JoiBodyMovieParams } = require('../utils/validationConstants');
const {
  getMovies, createMovie, deleteMovieById,
} = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', celebrate(JoiBodyMovieParams), createMovie);
router.delete('/:movieId', celebrate(JoiParamsMovieID), deleteMovieById);

module.exports = router;
