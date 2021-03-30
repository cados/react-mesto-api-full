const usersRouter = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getUsers, getUserId, updateUser, updateAvatar, getCurrentUser,
} = require('../controllers/users');

const {
  validateUpdateProfile,
  validateAvatar,
  validateId,
} = require('../middlewares/validation');

usersRouter.get('/users', auth, getUsers);
usersRouter.get('/users/me', auth, getCurrentUser);
usersRouter.get('/users/:id', auth, validateId, getUserId);
usersRouter.patch('/users/me', auth, validateUpdateProfile, updateUser);
usersRouter.patch('/users/me/avatar', auth, validateAvatar, updateAvatar);

module.exports = usersRouter;
