const { getPokemonCategory } = require('../../services/pokemon-categories.services');
const {
  internalServerError,
  successResponse,
  notFoundError
} = require('../../../../utils/result-response/result-response.utils');

const getPokemonCategoryController = async (req, res) => {
  const pokemonCategoryId = req.params.id;
  try {
    const pokemonCategory = await getPokemonCategory(pokemonCategoryId);
    if (!pokemonCategory) {
      return notFoundError(res);
    }
    return successResponse(res, pokemonCategory);
  } catch (error) {
    return internalServerError(res, error);
  }
}

module.exports = {
  getPokemonCategoryController
}
