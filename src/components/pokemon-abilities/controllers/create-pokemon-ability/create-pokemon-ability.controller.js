const {
  createPokemonAbilities
} = require('../../services/pokemon-abilities.service');
const {
  createdReponse,
  internalServerError
} = require('../../../../utils/result-response/result-response.utils');

const createPokemonAbilitiesController = async (req, res) => {
  const body = req.body;
  try {
    const results = await createPokemonAbilities(body);
    return createdReponse(res, results);
  } catch (error) {
    return internalServerError(res, error);
  }
}

module.exports = {
  createPokemonAbilitiesController
}
