const {
  getPokemonTypes,
  getCountPokemonTypes
} = require('../../services/pokemon-types.service');
const {
  successResponse,
  internalServerError
} = require('../../../../utils/result-response/result-response.utils');
const {
  paginatorTransformer
} = require('../../../../utils/paginator-transformer/paginator-transformer.utils');

const getPokemonTypesController = async (req, res) => {
  const queries = req.query;
  try {
    const paginator = paginatorTransformer(queries);
    const pokemonTypes = await getPokemonTypes(paginator);
    const count = await getCountPokemonTypes(paginator);
    paginator.count = count;
    return successResponse(res, { results: pokemonTypes, paginator });
  } catch (error) {
    return internalServerError(res, error);
  }
}

module.exports = {
  getPokemonTypesController
}
