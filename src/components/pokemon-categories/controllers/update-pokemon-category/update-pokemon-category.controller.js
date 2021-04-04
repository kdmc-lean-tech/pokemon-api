const {
  updatePokemonCategory,
  getPokemonCategory
} = require('../../services/pokemon-categories.service');
const {
  successResponse,
  internalServerError,
  notFoundError
} = require('../../../../utils/result-response/result-response.utils');

const updatePokemonCategoryController = async (req, res) => {
  const pokemonCategoryId = req.params.id;
  const { name } = req.body;
  try {
    const pokemonCategory = await getPokemonCategory(pokemonCategoryId);
    if (!pokemonCategory) {
      return notFoundError(res);
    }
    await updatePokemonCategory(pokemonCategoryId, { name });
    return successResponse(res, null, `The pokemon category ${ name } was updated`);
  } catch (error) {
    return internalServerError(res, error);
  }
}

module.exports = {
  updatePokemonCategoryController
}
