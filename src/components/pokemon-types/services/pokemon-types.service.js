const PokemonTypes = require('../models/pokemon-types.model');
const { Types } = require('mongoose');

const insertPokemonTypes = async (pokemonTypes) => {
  const pokemonTypesFormat = pokemonTypes.map(({ name }) => {
    return {
      name: name.toLowerCase()
    }
  });
  return await PokemonTypes.insertMany(pokemonTypesFormat);
}

const findPokemonTypes = async() => {
  return await PokemonTypes.aggregate([
    { $project: {
      name: 1
    }}
  ]);
}

const updatePokemonTypesById = async(pokemonTypesId, pokemonType) => {
  const { name } = pokemonType;
  return await PokemonTypes.updateOne(
    { _id: Types.ObjectId(pokemonTypesId) },
    { $set: { name: name.toLowerCase() } },
    { lean: true, new: true }
  );
}

const activePokemonType =async (pokemonTypesId, status)  => {
  const { active } = status;
  return await PokemonTypes.updateOne(
    { _id: Types.ObjectId(pokemonTypesId) },
    { $set: { active } },
    { lean: true, new: true }
  );
}

const getPokemonType = async(pokemonTypeId) => {
  return await PokemonTypes.findOne({ _id: Types.ObjectId(pokemonTypeId) });
}

const getCountPokemonTypes = async () => {
  return await PokemonTypes.aggregate([
    { $count: 'name' }
  ]).then(response => response[0] ? response[0].name : 0);
}

module.exports = {
  insertPokemonTypes,
  findPokemonTypes,
  updatePokemonTypesById,
  activePokemonType,
  getPokemonType,
  getCountPokemonTypes
}
