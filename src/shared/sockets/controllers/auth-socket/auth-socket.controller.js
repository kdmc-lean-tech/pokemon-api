const { verifyToken } = require('../../../../utils/jwt/jwt.utils');
const { getUser } = require('../../../../components/auth/services/auth.service');

const authSocketController = async (socket, next) => {
  const query = socket.handshake.query;
  const { token } = query;
  try {
    const { payload } = await verifyToken(token);
    const user = await getUser(payload._id);
    if (!user) {
      return socket.disconnect();
    }
    socket.request.user = user;
    socket.id = user._id;
    next();
  } catch (error) {
    return socket.disconnect();
  }
}

module.exports = {
  authSocketController
}
