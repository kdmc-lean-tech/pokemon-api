const {
  getSocketUsers
} = require('../../services/auth.service');

const getSocketUsersController = async (search, userId, page) => {
  return await getSocketUsers(search, userId, page);
}

module.exports = {
  getSocketUsersController
}
