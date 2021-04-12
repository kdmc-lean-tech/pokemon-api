const {
  authSocketController
} = require('../shared/sockets/controllers/index');
const { socketUserEvents } = require('../shared/sockets/events/users/users.events');
const { socketPokemonEvents } = require('../shared/sockets/events/pokemons/pokemon.events');

const socketListen = (io) => {

  // =======================================================================
  // Chat NameSpace IO
  // =======================================================================

  io.of('/chat').use(authSocketController);

  io.of('/chat').on('connection', async (socket) => {
    socketUserEvents(io, socket);
  });

  // =======================================================================
  // Pokemon NameSpace IO
  // =======================================================================

  io.of('/pokemon').use(authSocketController);

  io.of('/pokemon').on('connection', async (socket) => {
    socketPokemonEvents(io, socket);
  });

}

module.exports = {
  socketListen
}
