const {
  activePokemonAbilityController
} = require('../controllers/active-pokemon-ability/active-pokemon-ability.controller');

const {
  createPokemonAbilitiesController
} = require('../controllers/create-pokemon-ability/create-pokemon-ability.controller');

const {
  getAllPokemonAbilitiesController
} = require('../controllers/get-all-pokemons-abilities/get-all-pokemon-abilities.controller');

const {
  getPokemonAbilityController
} = require('../controllers/get-pokemon-ability/get-pokemon-ability.controller');

const {
  updatePokemonAbilityController
} = require('../controllers/update-pokemon-ability/update-pokemon-ability.controller');

module.exports = {
  activePokemonAbilityController,
  createPokemonAbilitiesController,
  getPokemonAbilityController,
  getAllPokemonAbilitiesController,
  updatePokemonAbilityController
}
