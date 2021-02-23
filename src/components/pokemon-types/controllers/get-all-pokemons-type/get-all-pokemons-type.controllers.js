const { findPokemonTypes } = require('../../services/pokemon-types.service');
const {
  successResponse,
  internalServerError
} = require('../../../../utils/result-response/result-response.utils');

const getAllPokemonTypesController = async(req, res) => {
  try {
    const pokemonTypes = await findPokemonTypes();
    return successResponse(res, { results: pokemonTypes });
  } catch (error) {
    return internalServerError(res, error);
  }
}

module.exports = {
  getAllPokemonTypesController
}
