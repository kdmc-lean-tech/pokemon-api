const PokemonTypes = require('../models/pokemon-types.model');
const { Types } = require('mongoose');

const insertPokemonTypes = async (pokemonTypes) => {
  return await PokemonTypes.insertMany(pokemonTypesFormat);
}

const getAllPokemonTypes = async() => {
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
    { $set: { name } },
  );
}

const activePokemonType =async (pokemonTypesId, status)  => {
  const { active } = status;
  return await PokemonTypes.updateOne(
    { _id: Types.ObjectId(pokemonTypesId) },
    { $set: { active } }
  );
}

const getPokemonType = async(pokemonTypeId) => {
  return await PokemonTypes.findOne({ _id: Types.ObjectId(pokemonTypeId) });
}

const searchPokemonTypes = async (search) => {
  return await PokemonTypes.aggregate([
    { $match: { name: { $regex: search, $options: 'i' } } },
    { $limit: 10 }
  ]);
}

const getPokemonTypes = async (paginator) => {
  return await PokemonTypes.find({
    name: { $regex: paginator.search, $options: 'i' }
  })
    .sort(paginator.sort)
    .limit(Number(paginator.itemPerPage))
    .skip(Number(paginator.offset))
    .exec();
}

const getCountPokemonTypes = async (paginator) => {
  return await PokemonTypes.find({
    name: { $regex: paginator.search, $options: 'i' }
  })
    .sort(paginator.sort)
    .limit(Number(paginator.itemPerPage))
    .skip(Number(paginator.offset))
    .countDocuments();
}

module.exports = {
  insertPokemonTypes,
  getAllPokemonTypes,
  updatePokemonTypesById,
  activePokemonType,
  getPokemonType,
  getCountPokemonTypes,
  searchPokemonTypes,
  getPokemonTypes
}
