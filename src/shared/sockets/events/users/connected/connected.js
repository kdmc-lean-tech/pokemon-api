const {
  getSocketUserController
} = require('../../../../../components/auth/controllers/index');

const connectedEvent = async (io, socket) => {
  const userId = socket.id;
  const user = await getSocketUserController(userId);
  io.of('/chat').emit('new-user-connected', user);
}

module.exports = {
  connectedEvent
}
