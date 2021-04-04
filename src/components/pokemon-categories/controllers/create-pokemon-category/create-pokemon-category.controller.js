const { createPokemonCategories } = require('../../services/pokemon-categories.service');
const {
  successResponse,
  internalServerError
} = require('../../../../utils/result-response/result-response.utils');

const createPokemonCategoriesController = async (req, res) => {
  const { pokemonCategories } = req.body;
  try {
    const results = await createPokemonCategories(pokemonCategories);
    return successResponse(res, results);
  } catch (error) {
    return internalServerError();
  }
}

module.exports = {
  createPokemonCategoriesController
}
