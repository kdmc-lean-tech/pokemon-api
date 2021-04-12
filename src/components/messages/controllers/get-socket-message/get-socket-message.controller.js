const { getMessage } = require('../../services/messages.service');

const getSocketMessageController = async (messageId) => {
  return await getMessage(messageId);
}

module.exports = {
  getSocketMessageController
}
