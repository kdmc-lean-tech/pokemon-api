const { socketListen } = require('../../config/sockets.config');

class Sockets {
  constructor(io) {
    this.io = io;
    this.socketEvents();
  }

  socketEvents() {
    socketListen(this.io);
  }
}

module.exports = {
  Sockets
}
