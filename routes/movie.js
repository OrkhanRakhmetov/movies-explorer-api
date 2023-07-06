const movieRouter = require('express').Router();

const { validatorCreateMovie, validationIdMovie } = require('../middlewares/validators/movie');

const {
  getMovies,
  createMovie,
  deleteMovieById,
} = require('../controllers/movie');

movieRouter.get('/', getMovies);
movieRouter.post('/', validatorCreateMovie, createMovie);
movieRouter.delete('/:movieId', validationIdMovie, deleteMovieById);

module.exports = movieRouter;
