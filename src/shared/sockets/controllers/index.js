const { authSocketController } = require('./auth-socket/auth-socket.controller');
const {
  userDisconnectedController,
} = require('./user-connected/user-connected.controller');

module.exports = {
  authSocketController,
  userDisconnectedController
}
