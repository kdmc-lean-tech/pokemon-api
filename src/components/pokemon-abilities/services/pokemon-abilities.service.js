const PokemonAbilities = require('../models/pokemon-abilities.model');

const createPokemonAbilities = async (pokemonAbilities) => {
  const pokemonAbilitiesFormat = pokemonAbilities.map(({ name }) => {
    return {
      name: name.toLowerCase()
    }
  });
  return await PokemonAbilities.insertMany(pokemonAbilitiesFormat);
}



module.exports = {
  createPokemonAbilities
}
