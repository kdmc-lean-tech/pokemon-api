const { findPokemonAbilities } = require('../../services/pokemon-abilities.service');
const {
  successResponse,
  internalServerError
} = require('../../../../utils/result-response/result-response.utils');

const getAllPokemonAbilitiesController = async(req, res) => {
  try {
    const pokemonAbilities = await findPokemonAbilities();
    return successResponse(res, { results: pokemonAbilities });
  } catch (error) {
    return internalServerError(res, error);
  }
}

module.exports = {
  getAllPokemonAbilitiesController
}
