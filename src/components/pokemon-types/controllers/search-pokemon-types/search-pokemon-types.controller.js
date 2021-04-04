const { searchPokemonTypes } = require('../../services/pokemon-types.service');
const {
  successResponse,
  internalServerError
} = require('../../../../utils/result-response/result-response.utils');

const searchPokemonTypesController = async (req, res) => {
  const search = req.params.search;
  try {
    const pokemonTypes = await searchPokemonTypes(search);
    return successResponse(res, pokemonTypes);
  } catch (error) {
    return internalServerError(res, error);
  }
}

module.exports = {
  searchPokemonTypesController
}
