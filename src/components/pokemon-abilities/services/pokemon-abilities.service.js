const PokemonAbilities = require('../models/pokemon-abilities.model');

const createPokemonAbilities = async (pokemonAbilities) => {
  return await PokemonAbilities.insertMany(pokemonAbilities);
}

const findPokemonAbilities = async() => {
  return await PokemonAbilities.aggregate([
    { $project: {
      name: 1
    }}
  ]);
}

const getCountPokemonAbilities = async () => {
  return await PokemonAbilities.aggregate([
    { $count: 'name' }
  ]).then(response => {
    return response[0] ? response[0].name : 0
  });
}

const updatePokemonAbilityById = async(pokemonAbilityId, pokemonAbility) => {
  const { name } = pokemonAbility;
  return await PokemonAbilities.updateOne(
    { _id: Types.ObjectId(pokemonAbilityId) },
    { $set: { name: name.toLowerCase() } },
    { lean: true, new: true }
  );
}

const activePokemonAbility =async (pokemonAbilityId, status)  => {
  const { active } = status;
  return await PokemonAbilities.updateOne(
    { _id: Types.ObjectId(pokemonAbilityId) },
    { $set: { active } },
    { lean: true, new: true }
  );
}

const getPokemonAbility = async(pokemonAbilityId) => {
  return await PokemonAbilities.findOne({ _id: Types.ObjectId(pokemonAbilityId) });
}

module.exports = {
  createPokemonAbilities,
  findPokemonAbilities,
  updatePokemonAbilityById,
  activePokemonAbility,
  getPokemonAbility,
  getCountPokemonAbilities
}
