const { createPokemonStatus } = require('../../services/pokemon-status.service');
const {
  successResponse,
  internalServerError
} = require('../../../../utils/result-response/result-response.utils');

const createPokemonStatusController = async (req, res) => {
  const body = req.body;
  try {
    const pokemonStatus = await createPokemonStatus(body);
    return successResponse(res, pokemonStatus);
  } catch (error) {
    return internalServerError(res, error);
  }
}

module.exports = {
  createPokemonStatusController
}
