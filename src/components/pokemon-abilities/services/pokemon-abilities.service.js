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
  return await PokemonAbilities.aggregate([
    { $match: { name: { $regex: paginator.search, $options: 'i' } } },
    { $sort: paginator.sort },
    { $limit: Number(paginator.itemPerPage) },
    { $skip: Number(paginator.offset) }
  ]);
}

const searchPokemonAbilities = async (search) => {
  return await PokemonAbilities.aggregate([
    { $match: { name: { $regex: search, $options: 'i' } } },
    { $limit: 10 }
  ]);
}

const getCountPokemonAbilities = async () => {
  return await PokemonAbilities.aggregate([
    { $match: { name: { $regex: paginator.search, $options: 'i' } } },
    { $sort: paginator.sort },
    { $limit: Number(paginator.itemPerPage) },
    { $skip: Number(paginator.offset) },
    { $count: 'name' }
  ]).then(response => {
    return response[0] ? response[0].name : 0
  });
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
  return await PokemonAbilities.aggregate([
    { $match: { _id: Types.ObjectId(pokemonAbilityId) } }
  ]).then(response => response[0]);
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
