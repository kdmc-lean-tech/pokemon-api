const { updatePokemonAbilityById, getPokemonAbility } = require('../../services/pokemon-abilities.service');
const {
  successResponse,
  internalServerError,
  notFoundError
} = require('../../../../utils/result-response/result-response.utils');

const updatePokemonAbilityController = async(req, res) => {
  const { name } = req.body;
  const pokemonAbilityId = req.params.id;
  try {
    const pokemonAbility = await getPokemonAbility(pokemonAbilityId);
    if (!pokemonAbility) {
      return notFoundError(res);
    }
    await updatePokemonAbilityById(pokemonAbilityId, { name });
    return successResponse(res, null, `The pokemon ability ${ name.toLowerCase() } was updated`);
  } catch (error) {
    return internalServerError(res, error);    
  }
}

module.exports = {
  updatePokemonAbilityController
}
