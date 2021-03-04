const { registerController } = require('../controllers/register/register.controller');
const { loginController } = require('../controllers/login/login.controller');
const {
  activateRegisteredUserController
} = require('../controllers/activate-registered-user/activate-registered-user.controller');
const { forgotPasswordController } = require('../controllers/forgot-password/forgot-password.controller');
const { changePasswordController } = require('../controllers/change-password/change-password.controller');
const {
  getSocketUsersController,
} = require('./get-all-socket-users/get-all-socket-users.controller');

module.exports = {
  registerController,
  loginController,
  activateRegisteredUserController,
  forgotPasswordController,
  changePasswordController,
  getSocketUsersController
}
