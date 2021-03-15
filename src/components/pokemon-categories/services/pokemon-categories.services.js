const { Types } = require('mongoose');
const PokemonCategory = require('../models/pokemon-category.model');

const getPokemonCategories = async () => {
  return await PokemonCategory.aggregate([
    { $project: { name: 1 } }
  ]);
}

const createPokemonCategories = async (pokemonCategories) => {
  return await PokemonCategory.insertMany(pokemonCategories);
}

const updatePokemonCategory = async (pokemonCategoryId, pokemon) => {
  return await PokemonCategory.updateOne(
    { _id: Types.ObjectId(pokemonCategoryId) },
    { $set: pokemon }
  );
}

const activePokemonCategory = async (pokemonCategoryId, status) => {
  const { active } = status;
  return await PokemonCategory.updateOne(
    { _id: Types.ObjectId(pokemonCategoryId) },
    { $set: { active } }
  );
}

const getPokemonCategory = async (pokemonCategoryId) => {
  return await PokemonCategory.aggregate([
    { $match: { _id: Types.ObjectId(pokemonCategoryId) } }
  ]).then(response => response[0]);
}

module.exports = {
  getPokemonCategories,
  createPokemonCategories,
  updatePokemonCategory,
  activePokemonCategory,
  getPokemonCategory
}
