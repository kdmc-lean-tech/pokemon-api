const { activePokemon, getPokemon } = require('../../services/pokemon.service');
const {
  successResponse,
  internalServerError,
  notFoundError
} = require('../../../../utils/result-response/result-response.utils');

const activePokemonController = async (req, res) => {
  const pokemonId = req.params.id;
  const { active }= req.body;
  try {
    const pokemon = await getPokemon(pokemonId);
    if (!pokemon) {
      return notFoundError(res);
    }
    await activePokemon(pokemonId, { active });
    return successResponse(res);
  } catch (error) {
    return internalServerError(res, error);
  }
}

module.exports = {
  activePokemonController
}
