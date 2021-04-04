const { Types } = require('mongoose');
const PokemonAbilities = require('../models/pokemon-abilities.model');

const createPokemonAbilities = async (pokemonAbilities) => {
  return await PokemonAbilities.insertMany(pokemonAbilities);
}

const getAllPokemonAbilities = async() => {
  return await PokemonAbilities.aggregate([
    { $project: {
      name: 1
    }}
  ]);
}

const getPokemonAbilities = async (paginator) => {
  return await PokemonAbilities.find({
    name: { $regex: paginator.search, $options: 'i' }
  })
    .sort(paginator.sort)
    .limit(Number(paginator.itemPerPage))
    .skip(Number(paginator.offset))
    .exec();
}

const searchPokemonAbilities = async (search) => {
  return await PokemonAbilities.aggregate([
    { $match: { name: { $regex: search, $options: 'i' } } },
    { $limit: 10 }
  ]);
}

const getCountPokemonAbilities = async (paginator) => {
  return await PokemonAbilities.find({
    name: { $regex: paginator.search, $options: 'i' }
  })
    .sort(paginator.sort)
    .limit(Number(paginator.itemPerPage))
    .skip(Number(paginator.offset))
    .countDocuments();
}

const updatePokemonAbilityById = async(pokemonAbilityId, pokemonAbility) => {
  return await PokemonAbilities.updateOne(
    { _id: Types.ObjectId(pokemonAbilityId) },
    { $set: pokemonAbility }
  );
}

const activePokemonAbility =async (pokemonAbilityId, status)  => {
  return await PokemonAbilities.updateOne(
    { _id: Types.ObjectId(pokemonAbilityId) },
    { $set: { active: status } }
  );
}

const getPokemonAbility = async(pokemonAbilityId) => {
  return await PokemonAbilities.findOne({
    _id: Types.ObjectId(pokemonAbilityId)
  });
}

module.exports = {
  createPokemonAbilities,
  updatePokemonAbilityById,
  activePokemonAbility,
  getPokemonAbility,
  getCountPokemonAbilities,
  getAllPokemonAbilities,
  getPokemonAbilities,
  searchPokemonAbilities
}
