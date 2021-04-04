const { searchPokemonCategories } = require('../../services/pokemon-categories.service');
const {
  successResponse,
  internalServerError
} = require('../../../../utils/result-response/result-response.utils');

const searchPokemonCategoriesController = async (req, res) => {
  const search = req.params.search;
  try {
    const pokemons = await searchPokemonCategories(search);
    return successResponse(res, pokemons);
  } catch (error) {
    return internalServerError(res, error);
  }
}

module.exports = {
  searchPokemonCategoriesController
}
