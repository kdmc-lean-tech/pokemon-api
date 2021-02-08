const { getPokemonAbility } = require('../../services/pokemon-abilities.service');
const {
  successResponse,
  internalServerError,
  notFoundError
} = require('../../../../utils/result-response/result-response.utils');

const getPokemonAbilityController = async(req, res) => {
  const pokemonAbilityId = req.params.id;
  try {
    const pokemonAbility = await getPokemonAbility(pokemonAbilityId);
    if (!pokemonAbility) {
      return notFoundError(res);
    }
    return successResponse(res, pokemonAbility);
  } catch (error) {
    return internalServerError(res, error);
  }
}

module.exports = {
  getPokemonAbilityController
}
