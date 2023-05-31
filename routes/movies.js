const router = require('express').Router();
const { celebrate } = require('celebrate');

const { JoiParamsMovieID, JoiBodyNameLink } = require('../utils/validationConstants');
const {
  getMovies, createMovie, deleteMovieById,
} = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', celebrate(JoiBodyNameLink), createMovie);
router.delete('/:movieId', celebrate(JoiParamsMovieID), deleteMovieById);

module.exports = router;
