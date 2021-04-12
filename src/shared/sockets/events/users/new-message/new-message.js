const {
  saveMessageController,
  getSocketMessageController
} = require('../../../../../components/messages/controllers/index');
const {
  chatRooms
} = require('../../../../../utils/constants/socket.constants');
const {
  getLimitMessages
} = require('../../../../../components/messages/services/messages.service');
const {
  getSocketUserController
} = require('../../../../../components/auth/controllers/get-socket-user/get-socket-user.controller');

const newMessageEvent = async (io, newMessage, room) => {
  if (chatRooms.includes(room)) {
    const result = await saveMessageController(newMessage);
    const { of, to } = result;
    const message = await getSocketMessageController(result._id);
    const totalMessages = await (await getLimitMessages(to, of)).length;
    const searchUser = await getSocketUserController(of);
    const user = {
      _id: searchUser._id,
      name: searchUser.name,
      online: searchUser.online,
      totalMessages
    }
    io.of('/chat').to(of).emit('private-message', {
      message,
      user
    });
    io.of('/chat').to(to).emit('private-message', {
      message,
      user
    });
  }
}

module.exports = {
  newMessageEvent
}
