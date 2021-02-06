const { getPokemonType } = require('../../services/pokemon-types.service');
const {
  successResponse,
  internalServerError,
  notFoundError
} = require('../../../../utils/result-response/result-response.utils');

const getPokemonTypeController = async(req, res) => {
  const pokemonTypeId = req.params.id;
  try {
    const pokemonType = await getPokemonType(pokemonTypeId);
    if (!pokemonType) {
      return notFoundError(res);
    }
    return successResponse(res, pokemonType);
  } catch (error) {
    return internalServerError(res, error);
  }
}

module.exports = {
  getPokemonTypeController
}
