const {
  authSocketController,
  userConnectedController,
  userDisconnectedController
} = require('../shared/sockets/controllers/index');

const {
  getSocketUsersController,
  getSocketUsersControllerById
} = require('../components/auth/controllers/index');

const {
  saveMessageController
} = require('../components/messages/controllers/index');

const socketListen = (io) => {

  io.use(authSocketController);
  io.use(userConnectedController);

  io.on('connection', async (socket) => {
    // TODO: Socket Events........
    io.emit('users', await getSocketUsersController());

    socket.on('users', async (search) => {
      io.to(socket.id).emit('users', await getSocketUsersControllerById(socket, search));
    });

    socket.on('private-message', async (chatMessage) => {
      const messageSaved = await saveMessageController(chatMessage);
      const { to, of } = messageSaved;
      io.to(to).emit('personal-message', messageSaved);
      io.to(of).emit('personal-message', messageSaved);
    });

    socket.on('disconnect', async () => {
      await userDisconnectedController(socket.id);
      io.emit('users', await getSocketUsersController());
    });
  });
}

module.exports = {
  socketListen
}
