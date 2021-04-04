const { getPokemonStatus } = require('../../services/pokemon-status.service');
const {
  internalServerError,
  successResponse,
  notFoundError
} = require('../../../../utils/result-response/result-response.utils');

const getPokemonStatusController = async (req, res) => {
  const pokemonId = req.params.id;
  try {
    const pokemonStatus = await getPokemonStatus(pokemonId);
    if (!pokemonStatus) {
      return notFoundError(res);
    }
    return successResponse(res, pokemonStatus);
  } catch (error) {
    return internalServerError(res, error);
  }
}

module.exports = {
  getPokemonStatusController
}
