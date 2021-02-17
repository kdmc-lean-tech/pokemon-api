const { verifyToken } = require('../../utils/jwt/jwt.utils');

class Sockets {
  constructor(io) {
    this.io = io;
    this.socketEvents();
  }

  socketEvents() {
    this.io.on('connection', (socket) => {
      const query = socket.handshake.query;
      const { token } = query;
      verifyToken(token)
          .then(({ payload }) => {
            if (!payload) {
              return socket.disconnect();
            }
            // TODO: Pending events............
          })
          .catch(err => {
            return socket.disconnect();
          });
    });
  }
}

module.exports = {
  Sockets
}
