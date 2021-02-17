const {
  authSocketController
} = require('../shared/sockets/controllers/auth-socket/auth-socket.controller');

const socketListen = (io) => {

  io.use(authSocketController);

  io.on('connection', socket => {
    // TODO: Socket Events........
  });
}

module.exports = {
  socketListen
}
