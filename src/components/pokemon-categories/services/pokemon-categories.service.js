const { Types } = require('mongoose');
const PokemonCategory = require('../models/pokemon-category.model');

const getAllPokemonCategories = async () => {
  return await PokemonCategory.aggregate([
    { $project: { name: 1 } }
  ]);
}

const getPokemonCategories = async (paginator) => {
  return await PokemonCategory.find({
    name: { $regex: paginator.search, $options: 'i' }
  })
    .sort(paginator.sort)
    .limit(Number(paginator.itemPerPage))
    .skip(Number(paginator.offset))
    .exec();
}

const getCountPokemonCategories = async (paginator) => {
  return await PokemonCategory.find({
    name: { $regex: paginator.search, $options: 'i' }
  })
    .sort(paginator.sort)
    .limit(Number(paginator.itemPerPage))
    .skip(Number(paginator.offset))
    .countDocuments();
}

const createPokemonCategories = async (pokemonCategories) => {
  return await PokemonCategory.insertMany(pokemonCategories);
}

const updatePokemonCategory = async (pokemonCategoryId, pokemonCategory) => {
  return await PokemonCategory.updateOne(
    { _id: Types.ObjectId(pokemonCategoryId) },
    { $set: pokemonCategory }
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

const searchPokemonCategories = async (search) => {
  return await PokemonCategory.aggregate([
    { $match: { name: { $regex: search, $options: 'i' } } },
    { $limit: 10 }
  ]); 
}

module.exports = {
  getPokemonCategories,
  createPokemonCategories,
  updatePokemonCategory,
  activePokemonCategory,
  getPokemonCategory,
  getAllPokemonCategories,
  getCountPokemonCategories,
  searchPokemonCategories
}
