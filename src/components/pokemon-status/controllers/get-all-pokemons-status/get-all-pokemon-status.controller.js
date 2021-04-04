const { getAllPokemonStatus } = require('../../services/pokemon-status.service');
const {
  internalServerError,
  successResponse
} = require('../../../../utils/result-response/result-response.utils');

const getAllPokemonStatusController = async (req, res) => {
  try {
    const pokemons = await getAllPokemonStatus();
    return successResponse(res, { results: pokemons });
  } catch (error) {
    return internalServerError(res, error);
  }
}

module.exports = {
  getAllPokemonStatusController
}
