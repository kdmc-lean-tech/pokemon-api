const {
  getSocketUsers,
  getSocketUsersById
} = require('../../services/auth.service');

const getSocketUsersControllerById = async (socket, search) => {
  const userId = socket.id;
  return await getSocketUsersById(userId, search);
}

const getSocketUsersController = async () => {
  return await getSocketUsers();
}

module.exports = {
  getSocketUsersController,
  getSocketUsersControllerById
}
