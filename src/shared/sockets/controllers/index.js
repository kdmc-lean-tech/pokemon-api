const { authSocketController } = require('./auth-socket/auth-socket.controller');
const {
  userConnectedController,
  userDisconnectedController,
} = require('./user-connected/user-connected.controller');

module.exports = {
  authSocketController,
  userConnectedController,
  userDisconnectedController,
}
