const {
  createPokemon
} = require('../../services/pokemon.service');
const {
  successResponse,
  internalServerError
} = require('../../../../utils/result-response/result-response.utils');

const createPokemonController = async (req, res) => {
  const pokemon = req.body;
  const user = req.user;
  try {
    const newPokemon = await createPokemon(pokemon, user._id);
    // TODO: Add notification.........
    // TODO: Send email to admin users........
    return successResponse(res, newPokemon);
  } catch (error) {
    return internalServerError(res, error);
  }
}

module.exports = {
  createPokemonController
}
