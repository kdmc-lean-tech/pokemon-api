const {
  getMessagesController
} = require('../controllers/get-all-messages/get-all-messages.controller');

const {
  saveMessageController
} = require('./save-message/save-message.controller');

const {
  seeMessageController
} = require('../controllers/see-message/see-message.controller');

const {
  getMessageController
} = require('../controllers/get-message/get-message.controller');

const {
  getSocketMessageController
} = require('../controllers/get-socket-message/get-socket-message.controller');

module.exports = {
  getMessagesController,
  saveMessageController,
  seeMessageController,
  getMessageController,
  getSocketMessageController
}
