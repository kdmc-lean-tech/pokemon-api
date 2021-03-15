const {
  getPokemonCategories
} = require('../../services/pokemon-categories.services');
const {
  internalServerError,
  successResponse
} = require('../../../../utils/result-response/result-response.utils');

const getPokemonCategoriesController = async (req, res) => {
  try {
    const pokemonCategories = await getPokemonCategories();
    return successResponse(res, { results: pokemonCategories });
  } catch (error) {
    return internalServerError(res, err);
  }
}

module.exports = {
  getPokemonCategoriesController
}
