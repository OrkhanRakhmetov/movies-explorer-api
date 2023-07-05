const router = require('express').Router();

const auth = require('../middlewares/auth');

const userRouter = require('./users');
const movieRouter = require('./movie');

const NotFoundError = require('../errors/NotFoundError');

const {
  validatorCreateUser,
  validatorLogin,
} = require('../middlewares/validators/users');

const { createUser, login, logout } = require('../controllers/users');

router.post('/signup', validatorCreateUser, createUser);
router.post('/signin', validatorLogin, login);
router.post('/signout', auth, logout);
router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);
router.use('*', auth, (req, res, next) => next(new NotFoundError('Такой страницы не существует')));

module.exports = router;
