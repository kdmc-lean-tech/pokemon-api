const PokemonAbilities = require('../models/pokemon-abilities.model');

const createPokemonAbilities = async (pokemonAbilities) => {
  const pokemonAbilitiesFormat = pokemonAbilities.map(({ name }) => {
    return {
      name: name.toLowerCase()
    }
  });
  return await PokemonAbilities.insertMany(pokemonAbilitiesFormat);
}


const findPokemonAbilities = async(paginator) => {
  return await PokemonAbilities.aggregate([
    { $match: { name: { $regex: paginator.search } } },
    { $sort: paginator.sort },
    { $limit: Number(paginator.itemPerPage) },
    { $skip: Number(paginator.offset) }
  ]);
}

const getCountPokemonAbilities = async () => {
  return await PokemonAbilities.find({}).countDocuments();
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
