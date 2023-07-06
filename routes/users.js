const userRouter = require('express').Router();

const {
  getUserInfo, updateUser,
} = require('../controllers/users');

const {
  validatorCreateUser,
} = require('../middlewares/validators/users');

userRouter.get('/me', getUserInfo);
userRouter.patch('/me', validatorCreateUser, updateUser);

module.exports = userRouter;
