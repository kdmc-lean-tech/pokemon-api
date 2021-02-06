const { findPokemonTypes } = require('../../services/pokemon-types.service');
const {
  successResponse,
  internalServerError
} = require('../../../../utils/result-response/result-response.utils');
const {
  convertSortQueryParams
} = require('../../../../utils/sort-query-params-transformer/sort-query-params.utils');

const getAllPokemonTypesController = async(req, res) => {
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
      const pokemonsType = await findPokemonTypes(paginator);
      return successResponse(res, { results: pokemonsType, paginator });
    } catch (error) {
      return internalServerError(res, error);
    }
  } catch (error) {
    return internalServerError(res, error);
  }
}

module.exports = {
  getAllPokemonTypesController
}
