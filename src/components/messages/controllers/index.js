const {
  getMessagesController
} = require('../controllers/get-all-messages/get-all-messages.controller');

const {
  saveMessageController
} = require('./save-message/save-message.controller');

module.exports = {
  getMessagesController,
  saveMessageController
}
