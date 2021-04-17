const {
  getSocketUsersController
} = require('../../../../../components/auth/controllers/index');
const {
  chatRooms
} = require('../../../../../utils/constants/socket.constants');

const joinRoomEvent = async (socket, io, search, room) => {
  if (chatRooms.includes(room) && room === 'users-room') {
    socket.join(`${room}/${socket.id}`);
    const users = await getSocketUsersController(search, socket.id);
    io.of('/chat').in(`${room}/${socket.id}`).emit('users', users);
  }  
}

module.exports = {
  joinRoomEvent
}
