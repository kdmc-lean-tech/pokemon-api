const {
  createPokemonTypesController
} = require('../controllers/create-pokemon-type/create-pokemon-type.controller');

const {
  getAllPokemonTypesController
} = require('../controllers/get-all-pokemons-type/get-all-pokemons-type.controllers');

const {
  updatePokemonTypeController
} = require('../controllers/update-pokemon-type/update-pokemon-type.controller');

const {
  activePokemonController
} = require('../controllers/active-pokemon-type/active-pokemon-type.controller');

const {
  getPokemonTypeController
} = require('../controllers/get-pokemon-type/get-pokemon-type.controller');

const {
  getPokemonTypesController
} = require('../controllers/get-pokemon-types/get-pokemon-types.controller');

const {
  searchPokemonTypesController
} = require('../controllers/search-pokemon-types/search-pokemon-types.controller');

module.exports = {
  createPokemonTypesController,
  getAllPokemonTypesController,
  updatePokemonTypeController,
  activePokemonController,
  getPokemonTypeController,
  getPokemonTypesController,
  searchPokemonTypesController
}
