const {
  createPokemonController
} = require('../controllers/create-pokemon/create-pokemon.controller');

const {
  getPokemonController
} = require('../controllers/get-pokemon/get-pokemon.controller');

const {
  getAllPokemonsController
} = require('../controllers/get-all-pokemons/get-all-pokemons.controller');

const {
  activePokemonController
} = require('../controllers/active-pokemon/active-pokemon.controller');

const {
  updatePokemonController
} = require('../controllers/update-pokemon/update-pokemon.controller');

const {
  approvePokemonCreatedController
} = require('../controllers/approve-pokemon/approve-pokemon.controller');

const {
  searchPokemonsController
} = require('../controllers/search-pokemons/search-pokemons.controller');

module.exports = {
  createPokemonController,
  getPokemonController,
  getAllPokemonsController,
  activePokemonController,
  updatePokemonController,
  approvePokemonCreatedController,
  searchPokemonsController
}
