const { searchPokemons } = require('../../services/pokemon.service');
const {
  successResponse,
  internalServerError
} = require('../../../../utils/result-response/result-response.utils');

const searchPokemonsController = async (req, res) => {
  const { search } = req.query;
  try {
    const pokemons = await searchPokemons(search);
    return successResponse(res, { results: pokemons });
  } catch (error) {
    return internalServerError(res, error);
  }
}

module.exports = {
  searchPokemonsController
}
