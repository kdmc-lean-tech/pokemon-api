
const socketPokemonEvents = async (io, socket) => {
  io.on('disconnect', async () => {
  });
}

module.exports = {
  socketPokemonEvents
}
