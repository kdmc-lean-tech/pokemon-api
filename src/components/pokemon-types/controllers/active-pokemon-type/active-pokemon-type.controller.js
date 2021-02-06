const { activePokemonType, getPokemonType } = require('../../services/pokemon-types.service');
const {
  successResponse,
  internalServerError,
  notFoundError
} = require('../../../../utils/result-response/result-response.utils');

const activePokemonController = async(req, res) => {
  const { active } = req.body;
  const pokemonTypeId = req.params.id;
  try {
    const pokemonType = await getPokemonType(pokemonTypeId);
    if (!pokemonType) {
      return notFoundError(res);
    }
    await activePokemonType(pokemonTypeId, { active });
    return successResponse(res, null, `The pokemon type was updated`);
  } catch (error) {
    return internalServerError(res, error);
  }
}

module.exports = {
  activePokemonController
}
