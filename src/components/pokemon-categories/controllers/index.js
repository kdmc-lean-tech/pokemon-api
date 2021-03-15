const {
  getPokemonCategoriesController
} = require('./get-pokemon-categories/get-pokemon-categories.controller');

const {
  activePokemonCategoryController
} = require('./active-pokemon-category/active-pokemon-category.controller');

const {
  createPokemonCategoriesController
} = require('./create-pokemon-category/create-pokemon-category.controller');

const {
  getPokemonCategoryController
} = require('./get-pokemon-category/get-pokemon-category.controller');

const {
  updatePokemonCategoryController
} = require('./update-pokemon-category/update-pokemon-category.controller');

module.exports = {
  getPokemonCategoriesController,
  activePokemonCategoryController,
  createPokemonCategoriesController,
  getPokemonCategoryController,
  updatePokemonCategoryController
}
