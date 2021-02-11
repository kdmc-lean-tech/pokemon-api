const { findPokemonTypes, getCountPokemonTypes } = require('../../services/pokemon-types.service');
const {
  successResponse,
  internalServerError
} = require('../../../../utils/result-response/result-response.utils');
const {
  paginatorTransformer
} = require('../../../../utils/paginator-transformer/paginator-transformer.utils');

const getAllPokemonTypesController = async(req, res) => {
  const queries = req.query;
  try {
    const paginator = paginatorTransformer(queries);
    const pokemonTypes = await findPokemonTypes(paginator);
    const count = await getCountPokemonTypes();
    paginator.count = count;
    return successResponse(res, { results: pokemonTypes, paginator });
  } catch (error) {
    return internalServerError(res, error);
  }
}

module.exports = {
  getAllPokemonTypesController
}
