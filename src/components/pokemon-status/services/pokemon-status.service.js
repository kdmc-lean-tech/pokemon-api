const { Types } = require('mongoose');
const PokemonStatus = require('../models/pokemon-status.model');

const getAllPokemonStatus = async () => {
  return await PokemonStatus.aggregate([
    { $project: { name: 1 } }
  ]);
}

const getPokemonStatus = async (pokemonStatusId) => {
  return await PokemonStatus.aggregate([
    { $match: { _id: Types.ObjectId(pokemonStatusId) } }
  ]).then(response => response[0]);
}

const createPokemonStatus = async (pokemonStatus) => {
  return await PokemonStatus.create(pokemonStatus);
}

const getPokemonStatusByName = async (name) => {
  return PokemonStatus.findOne({
    name
  });
}

module.exports = {
  getAllPokemonStatus,
  getPokemonStatus,
  createPokemonStatus,
  getPokemonStatusByName
}
