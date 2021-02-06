const {
  insertPokemonTypes
} = require('../../services/pokemon-types.service');
const {
  createdReponse,
  internalServerError
} = require('../../../../utils/result-response/result-response.utils');

const createPokemonTypesController = async (req, res) => {
  const { pokemonTypes } = req.body;
  try {
    const results = await insertPokemonTypes(pokemonTypes);
    return createdReponse(res, results);
  } catch (error) {
    return internalServerError(res, error);
  }
}

module.exports = {
  createPokemonTypesController
}
