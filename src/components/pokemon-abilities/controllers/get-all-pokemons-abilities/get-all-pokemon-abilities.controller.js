const { findPokemonAbilities, getCountPokemonAbilities } = require('../../services/pokemon-abilities.service');
const {
  successResponse,
  internalServerError
} = require('../../../../utils/result-response/result-response.utils');
const {
  paginatorTransformer
} = require('../../../../utils/paginator-transformer/paginator-transformer.utils');

const getAllPokemonAbilitiesController = async(req, res) => {
  const queries = req.query;
  try {
    const paginator = paginatorTransformer(queries);
    const pokemonAbilities = await findPokemonAbilities(paginator);
    const count = await getCountPokemonAbilities();
    paginator.count = count;
    return successResponse(res, { results: pokemonAbilities, paginator });
  } catch (error) {
    return internalServerError(res, error);
  }
}

module.exports = {
  getAllPokemonAbilitiesController
}
