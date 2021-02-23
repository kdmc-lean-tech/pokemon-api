const { saveMessage } = require('../../services/messages.service');

const saveMessageController = async (chatMessage) => {
    return await saveMessage(chatMessage);
}

module.exports = {
  saveMessageController
};
