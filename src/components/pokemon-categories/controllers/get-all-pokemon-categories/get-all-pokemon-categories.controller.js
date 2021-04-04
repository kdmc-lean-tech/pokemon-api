const {
  getAllPokemonCategories
} = require('../../services/pokemon-categories.service');
const {
  successResponse,
  internalServerError
} = require('../../../../utils/result-response/result-response.utils');

const getAllPokemonCategoriesController = async (req, res) => {
  try {
    const pokemonCategories = await getAllPokemonCategories();
    return successResponse(res, { results: pokemonCategories });
  } catch (error) {
    return internalServerError(res, error);
  }
}

module.exports = {
  getAllPokemonCategoriesController
}
