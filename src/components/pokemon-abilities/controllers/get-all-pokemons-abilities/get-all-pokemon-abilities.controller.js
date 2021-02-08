const { findPokemonAbilities } = require('../../services/pokemon-abilities.service');
const {
  successResponse,
  internalServerError
} = require('../../../../utils/result-response/result-response.utils');
const {
  convertSortQueryParams
} = require('../../../../utils/sort-query-params-transformer/sort-query-params.utils');

const getAllPokemonAbilitiesController = async(req, res) => {
  const { page, itemPerPage, sort, search } = req.query;
  try {
    const offset = page * itemPerPage - itemPerPage;
    const paginator = {
      offset,
      page,
      itemPerPage,
      sort: convertSortQueryParams(sort),
      search,
    };
    try {
      const pokemonAbilities = await findPokemonAbilities(paginator);
      return successResponse(res, { results: pokemonAbilities, paginator });
    } catch (error) {
      return internalServerError(res, error);
    }
  } catch (error) {
    return internalServerError(res, error);
  }
}

module.exports = {
  getAllPokemonAbilitiesController
}
