const { getPokemon, updatePokemon } = require('../../services/pokemon.service');
const {
  successResponse,
  internalServerError,
  notFoundError
} = require('../../../../utils/result-response/result-response.utils');

const updatePokemonController = async (req, res) => {
  const pokemonId = req.params.id;
  const pokemon = req.body;
  try {
    const pokemonExist = await getPokemon(pokemonId);
    if (!pokemonExist) {
      return notFoundError(res);
    }
    await updatePokemon(pokemonId, pokemon);
    return successResponse(res);
  } catch (error) {
    return internalServerError(res, error);
  }
}

module.exports = {
  updatePokemonController
}
