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

const findPokemonTypes = async(paginator) => {
  return await PokemonTypes.aggregate([
    { $match: { name: { $regex: paginator.search } } },
    { $sort: paginator.sort },
    { $limit: Number(paginator.itemPerPage) },
    { $skip: Number(paginator.offset) }
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
  return await PokemonTypes.find({}).countDocuments();
}

module.exports = {
  insertPokemonTypes,
  findPokemonTypes,
  updatePokemonTypesById,
  activePokemonType,
  getPokemonType,
  getCountPokemonTypes
}
