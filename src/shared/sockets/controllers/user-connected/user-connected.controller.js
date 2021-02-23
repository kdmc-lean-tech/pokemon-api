const { setOnlineStatus } = require('../../../../components/auth/services/auth.service');

const userConnectedController = async (socket, next) => {
  await setOnlineStatus(socket.id, true);
  next();
}

const userDisconnectedController = async (userId) => {
  await setOnlineStatus(userId, false);
}

module.exports = {
  userConnectedController,
  userDisconnectedController
}
