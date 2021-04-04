const {
  createPokemonStatusController
} = require('./create-pokemon-status/create-pokemon-status.controller');
const {
  getAllPokemonStatusController
} = require('./get-all-pokemons-status/get-all-pokemon-status.controller');
const {
  getPokemonStatusController
} = require('./get-pokemon-status/get-pokemon-status.controller');

module.exports = {
  createPokemonStatusController,
  getAllPokemonStatusController,
  getPokemonStatusController
}
