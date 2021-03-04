const { setOnlineStatus } = require('../../../../components/auth/services/auth.service');

const userDisconnectedController = async (userId) => {
  await setOnlineStatus(userId, false);
}

module.exports = {
  userDisconnectedController
}
