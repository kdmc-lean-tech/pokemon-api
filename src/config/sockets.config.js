const {
  authSocketController,
  userDisconnectedController
} = require('../shared/sockets/controllers/index');

const {
  getSocketUsersController
} = require('../components/auth/controllers/index');

const {
  saveMessageController,
  seeMessageController
} = require('../components/messages/controllers/index');
const { verifyToken } = require('../utils/jwt/jwt.utils');
const { getMessage } = require('../components/messages/services/messages.service');

const chatRooms = ['users-room', 'set-chat', 'seen'];

const socketListen = (io) => {

  // =======================================================================
  // Chat NameSpace IO
  // =======================================================================

  io.of('/chat').use(authSocketController);

  io.of('/chat').on('connection', async (socket) => {

    io.of('/chat').emit('update-users');

    socket.on('new-message', async ({ newMessage, room }) => {
      if (chatRooms.includes(room)) {
        const result = await saveMessageController(newMessage);
        const { of, to } = result;
        const message = await getMessage(result._id);
        io.of('/chat').to(of).emit('private-message', message);
        io.of('/chat').to(to).emit('private-message', message);
        io.of('/chat').emit('update-users');
      }
    });

    socket.on('join-room', async ({ search, room }) => {
      if (chatRooms.includes(room) && room === 'users-room') {
        socket.join(`${room}/${socket.id}`);
        const users = await getSocketUsersController(search, socket.id);
        io.of('/chat').in(`${room}/${socket.id}`).emit('users', users);
      }
    });

    socket.on('see-message', async ({ messageIds, room }) => {
      if (chatRooms.includes(room)) {
        await seeMessageController(messageIds);
        io.of('/chat').emit('update-users');
      }
    });

    socket.on('disconnect', async () => {
      const { token } = socket.handshake.query;
      const { payload } = await verifyToken(token);
      await userDisconnectedController(payload._id);
      io.of('/chat').emit('update-users');
    });
  });

  // =======================================================================
  // Chat NameSpace IO
  // =======================================================================
}

module.exports = {
  socketListen
}
