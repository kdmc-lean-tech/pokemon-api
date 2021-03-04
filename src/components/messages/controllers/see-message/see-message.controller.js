const { seeMessage } = require('../../services/messages.service');

const seeMessageController = async (messageIds) => {
  const promises = [];
  messageIds.forEach((messageId) => {
    promises.push(seeMessage(messageId));
  });
  await Promise.all(promises);
}

module.exports = {
  seeMessageController
}
