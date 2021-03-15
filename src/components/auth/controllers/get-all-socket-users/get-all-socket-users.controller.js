const {
  getSocketUsers
} = require('../../services/auth.service');

const getSocketUsersController = async (search, userId) => {
  return await getSocketUsers(search, userId);
}

module.exports = {
  getSocketUsersController
}
