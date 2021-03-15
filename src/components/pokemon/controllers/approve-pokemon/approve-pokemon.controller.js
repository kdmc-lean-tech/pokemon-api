const { approvePokemonCreated, getPokemon } = require('../../services/pokemon.service');
const {
  successResponse,
  internalServerError,
  notFoundError
} = require('../../../../utils/result-response/result-response.utils');

const approvePokemonCreatedController = async (req, res) => {
  const pokemonId = req.params.id;
  try {
    const pokemon = await getPokemon(pokemonId);
    if (!pokemon) {
      return notFoundError(res);
    }
    const result = await approvePokemonCreated(pokemonId);
    // TODO: Send email to user that created pokemon......
    return result !== null ? successResponse(res) : internalServerError(res);
  } catch (error) {
    return internalServerError(res, error);
  }
}

module.exports = {
  approvePokemonCreatedController
}
