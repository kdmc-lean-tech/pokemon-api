const { updatePokemonTypesById, getPokemonType } = require('../../services/pokemon-types.service');
const {
  successResponse,
  internalServerError,
  notFoundError
} = require('../../../../utils/result-response/result-response.utils');

const updatePokemonTypeController = async(req, res) => {
  const { name } = req.body;
  const pokemonTypeId = req.params.id;
  try {
    const pokemonType = await getPokemonType(pokemonTypeId);
    if (!pokemonType) {
      return notFoundError(res);
    }
    await updatePokemonTypesById(pokemonTypeId, { name });
    return successResponse(res, null, `The pokemon type ${ name.toLowerCase() } was updated`);
  } catch (error) {
    return internalServerError(res, error);    
  }
}

module.exports = {
  updatePokemonTypeController
}
