const {
  createPokemon
} = require('../../services/pokemon.service');
const {
  successResponse,
  internalServerError
} = require('../../../../utils/result-response/result-response.utils');
const { getRole } = require('../../../roles/services/roles.service');

const createPokemonController = async (req, res) => {
  const pokemon = req.body;
  const user = req.user;
  const role = await getRole(user.roleId);
  if (role !== 'admin') {
    pokemon.active = false;
  }
  try {
    const newPokemon = await createPokemon(pokemon, user._id);
    return successResponse(res, newPokemon);
  } catch (error) {
    return internalServerError(res, error);
  }
}

module.exports = {
  createPokemonController
}
