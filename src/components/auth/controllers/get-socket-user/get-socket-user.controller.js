const { getSocketUser } = require('../../services/auth.service');

const getSocketUserController = async (userId) => {
  return await getSocketUser(userId);
}

module.exports = {
  getSocketUserController
}
