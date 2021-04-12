const {
  verifyToken
} = require('../../../../../utils/jwt/jwt.utils');
const {
  userDisconnectedController
} = require('../../../controllers/index');

const disconnectedEvent = async (io, socket) => {
  const { token } = socket.handshake.query;
  const { payload } = await verifyToken(token);
  await userDisconnectedController(payload._id);
  io.of('/chat').emit('update-users');
}

module.exports = {
  disconnectedEvent
}
