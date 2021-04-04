const {
  getPokemonCategories,
  getCountPokemonCategories
} = require('../../services/pokemon-categories.service');
const {
  internalServerError,
  successResponse
} = require('../../../../utils/result-response/result-response.utils');
const {
  paginatorTransformer
} = require('../../../../utils/paginator-transformer/paginator-transformer.utils');

const getPokemonCategoriesController = async (req, res) => {
  const queries = req.query;
  try {
    const paginator = paginatorTransformer(queries);
    const pokemonCategories = await getPokemonCategories(paginator);
    const count = await getCountPokemonCategories(paginator);
    paginator.count = count;
    return successResponse(res, { results: pokemonCategories, paginator });
  } catch (error) {
    return internalServerError(res, error);
  }
}

module.exports = {
  getPokemonCategoriesController
}
