const { searchPokemonAbilities } = require('../../services/pokemon-abilities.service');
const {
  successResponse,
  internalServerError
} = require('../../../../utils/result-response/result-response.utils');

const searchPokemonAbilitiesController = async (req, res) => {
  const search = req.params.search;
  try {
    const pokemonAbilities = await searchPokemonAbilities(search);
    return successResponse(res, pokemonAbilities);
  } catch (error) {
    return internalServerError(res, error);
  }
}

module.exports = {
  searchPokemonAbilitiesController
}
