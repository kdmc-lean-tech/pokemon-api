const { getAllPokemons, getTotalPokemons } = require('../../services/pokemon.service');
const {
  successResponse,
  internalServerError
} = require('../../../../utils/result-response/result-response.utils');
const {
  paginatorTransformer
} = require('../../../../utils/paginator-transformer/paginator-transformer.utils');

const getAllPokemonsController = async(req, res) => {
  const queries = req.query;
  try {
    const paginator = paginatorTransformer(queries);
    const pokemons = await getAllPokemons(paginator);
    paginator.count = await getTotalPokemons(paginator);
    return successResponse(res, { results: pokemons, paginator });
  } catch (error) {
    console.log(error);
    return internalServerError(res, error);
  }
}

module.exports = {
  getAllPokemonsController
}
