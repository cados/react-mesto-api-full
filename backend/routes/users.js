const usersRouter = require('express').Router();
const {
  getUsers, getUserId, updateUser, updateAvatar, getCurrentUser,
} = require('../controllers/users');

const {
  validateUpdateProfile,
  validateAvatar,
  validateId,
} = require('../middlewares/validation');

usersRouter.get('/users', getUsers);
usersRouter.get('/users/:id', validateId, getUserId);
usersRouter.get('/users/me', getCurrentUser);
usersRouter.patch('/users/me', validateUpdateProfile, updateUser);
usersRouter.patch('/users/me/avatar', validateAvatar, updateAvatar);

module.exports = usersRouter;
