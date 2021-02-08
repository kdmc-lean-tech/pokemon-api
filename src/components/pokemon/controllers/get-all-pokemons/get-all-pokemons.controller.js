const { getAllPokemons, getTotalPokemons } = require('../../services/pokemon.service');
const {
  successResponse,
  internalServerError
} = require('../../../../utils/result-response/result-response.utils');
const {
  convertSortQueryParams
} = require('../../../../utils/sort-query-params-transformer/sort-query-params.utils');

const getAllPokemonsController = async(req, res) => {
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
      const pokemons = await getAllPokemons(paginator);
      paginator.count = await getTotalPokemons();
      return successResponse(res, { results: pokemons, paginator });
    } catch (error) {
      return internalServerError(res, error);
    }
  } catch (error) {
    return internalServerError(res, error);
  }
}

module.exports = {
  getAllPokemonsController
}
