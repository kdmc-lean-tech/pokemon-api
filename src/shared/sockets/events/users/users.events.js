const { newMessageEvent } = require('./new-message/new-message');
const { joinRoomEvent } = require('./join-room/join-room');
const { seeMessageEvent } = require('./see-message/see-message');
const { disconnectedEvent } = require('./disconnected/disconnected');

const socketUserEvents = (io, socket) => {
  io.of('/chat').emit('update-users');

  socket.on('new-message', async ({ newMessage, room }) => {
    await newMessageEvent(io, newMessage, room);
  });

  socket.on('join-room', async ({ search, room, page }) => {
    await joinRoomEvent(socket, io, search, room, page);
  });

  socket.on('see-message', async ({ messageIds, room, to }) => {
    await seeMessageEvent(io, messageIds, room, to, socket);
  });

  socket.on('disconnect', async () => {
    await disconnectedEvent(io, socket);
  });
}

module.exports = {
  socketUserEvents
}
