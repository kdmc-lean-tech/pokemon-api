const {
  seeMessageController
} = require('../../../../../components/messages/controllers/index');
const {
  chatRooms
} = require('../../../../../utils/constants/socket.constants');
const {
  getSocketUserController
} = require('../../../../../components/auth/controllers/get-socket-user/get-socket-user.controller');

const seeMessageEvent = async (io, messageIds, room, to, socket) => {
  const searchUser = await getSocketUserController(to);
  const user = {
    _id: searchUser._id,
    name: searchUser.name,
    online: searchUser.online,
    totalMessages: 0
  }
  if (chatRooms.includes(room)) {
    await seeMessageController(messageIds);
    io.of('/chat').to(socket.id).emit('message-viewed', user);
  }
}

module.exports = {
  seeMessageEvent
}
