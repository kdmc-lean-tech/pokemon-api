const { verifyToken } = require('../../../../utils/jwt/jwt.utils');
const { getUser } = require('../../../../components/auth/services/auth.service');

const authSocketController = (socket, next) => {
  const query = socket.handshake.query;
  const { token } = query;
  verifyToken(token)
      .then(({ payload }) => {
        return getUser(payload._id);
      })
      .then(user => {
        if (!user) {
          return socket.disconnect();
        }
        socket.request.user = user;
        socket.id = user._id;
        next();
      })
      .catch(err => {
        return socket.disconnect();
      });
}

module.exports = {
  authSocketController
}
