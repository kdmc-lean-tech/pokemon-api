const { Server } = require('./src/server/server');

const server = new Server();

server.execute(port => {
  console.log(`Listening port ${ port }`);
});
