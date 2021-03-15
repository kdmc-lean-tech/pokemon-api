const { removeImageAndS3Resource, getImage } = require('../../services/uploads.service');
const {
  getPokemon,
  updateAvatarPokemon
} = require('../../../../pokemon/services/pokemon.service');
const {
  successResponse,
  internalServerError,
  notFoundError
} = require('../../../../../utils/result-response/result-response.utils');

const uploadAvatarPokemonController = async (req, res) => {
  try {
    const avatar = req.image;
    const pokemonId = req.params.id;
    const pokemon = await getPokemon(pokemonId);
    if (!pokemon) {
      return notFoundError(res);
    }
    if (!!pokemon.avatar) {
      const image = await getImage(pokemon.avatar._id);
      await removeImageAndS3Resource(image);
    }
    await updateAvatarPokemon(pokemon, avatar);
    return successResponse(res, pokemon);
  } catch (error) {
    await removeImageAndS3Resource(req.image);
    return internalServerError(res, error);
  }
}

module.exports = {
  uploadAvatarPokemonController
}
