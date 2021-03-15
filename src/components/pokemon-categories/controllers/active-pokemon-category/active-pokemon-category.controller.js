const {
  activePokemonCategory,
  getPokemonCategory
} = require('../../services/pokemon-categories.services');
const {
  successResponse,
  internalServerError,
  notFoundError
} = require('../../../../utils/result-response/result-response.utils');

const activePokemonCategoryController = async (req, res) => {
  const pokemonCategoryId = req.params.id;
  const { active } = req.body;
  try {
    const pokemonCategory = await getPokemonCategory(pokemonCategoryId);
    if (!pokemonCategory) {
      return notFoundError(res);
    }
    await activePokemonCategory(pokemonCategoryId, { active });
    return successResponse(res, null, `The pokemon category was updated`);
  } catch (error) {
    return internalServerError(res, error);
  }
}

module.exports = {
  activePokemonCategoryController
}
