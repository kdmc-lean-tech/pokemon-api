const { getPokemon } = require('../../services/pokemon.service');
const {
  successResponse,
  notFoundError,
  internalServerError
} = require('../../../../utils/result-response/result-response.utils');

const getPokemonController = async (req, res) => {
  const pokemonId = req.params.id;
  try {
    const pokemon = await getPokemon(pokemonId);
    if (!pokemon) {
      return notFoundError(res);
    }
    return successResponse(res, pokemon);
  } catch (error) {
    console.log(error);
    return internalServerError(res, error);
  }
}

module.exports = {
  getPokemonController
}
