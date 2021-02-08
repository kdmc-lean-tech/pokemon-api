const { activePokemonAbility, getPokemonAbility } = require('../../services/pokemon-abilities.service');
const {
  successResponse,
  internalServerError,
  notFoundError
} = require('../../../../utils/result-response/result-response.utils');

const activePokemonAbilityController = async(req, res) => {
  const { active } = req.body;
  const pokemonAbilityId = req.params.id;
  try {
    const pokemonAbility = await getPokemonAbility(pokemonAbilityId);
    if (!pokemonAbility) {
      return notFoundError(res);
    }
    await activePokemonAbility(pokemonAbilityId, { active });
    return successResponse(res, null, `The pokemon ability was updated`);
  } catch (error) {
    return internalServerError(res, error);
  }
}

module.exports = {
  activePokemonAbilityController
}
