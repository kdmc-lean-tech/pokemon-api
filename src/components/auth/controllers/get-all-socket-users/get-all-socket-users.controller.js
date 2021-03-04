const {
  getSocketUsers
} = require('../../services/auth.service');

const getSocketUsersController = async (search) => {
  return await getSocketUsers(search);
}

module.exports = {
  getSocketUsersController
}
