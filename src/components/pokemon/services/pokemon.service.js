const { Types } = require('mongoose');
const Pokemon = require('../models/pokemon.model');
const {
  createByLookup,
  typesLookup,
  abilitiesLookup,
} = require('./lookups/pokemon.lookup');

const createPokemon = async (pokemon, userId) => {
  pokemon.name = pokemon.name.toLowerCase();
  pokemon.japaneseName = pokemon.japaneseName.toLowerCase();
  pokemon.createdBy = userId;
  const newPokemon = new Pokemon(pokemon);
  await newPokemon.save();
  return newPokemon;
}

const getPokemon = async (pokemonId) => {
  return await Pokemon.aggregate(
    [
      { 
        $match: {
            $and: [
              { _id: Types.ObjectId(pokemonId) },
              { active: true }
            ]
        }
      },
      { $lookup: createByLookup },
      { $unwind: '$createdBy' },
      { $lookup: typesLookup },
      { $lookup: abilitiesLookup },
    ]
  ).then(pokemon => pokemon[0]);
}

const getAllPokemons = async (paginator) => {
  return await Pokemon.aggregate([
    { $match: 
      {
        $and: [
          { name: { $regex: paginator ? paginator.search : '' } },
          { active: true }
        ]
      }
    },
    { $skip: Number(paginator.offset) },
    { $limit: Number(paginator.itemPerPage) },
    { $sort: paginator.sort },
    { $lookup: createByLookup },
    { $unwind: `\$${ createByLookup.as }` },
    { $lookup: typesLookup },
    { $lookup: abilitiesLookup },
    {
      $project: {
        name: 1,
        pokedexNumber: 1,
        'createdBy.name': 1,
        createdAt: 1,
        generation: 1
      }
    },
  ]);
}

const getTotalPokemons = async (paginator) => {
  return await Pokemon.aggregate(
   [
    { $match: 
      {
        $and: [
          { name: { $regex: paginator ? paginator.search : '' } },
          { active: true }
        ]
      }
    },
    { $count: 'name' }
   ]
  ).then(response => {
    return response[0] ? response[0].name : 0
  });
}

const getTotalPokemonsByUser = async (userId) => {
  return await Pokemon.find({ createdBy: userId }).countDocuments();
}

const getAllPokemonsByUser = async (userId, paginator) => {
  return await Pokemon.aggregate(
    [
      { 
        $match: {
          $and: [
            { name: { $regex: paginator.search } },
            { active: true },
            { createdBy: userId }
          ]
        } 
      },
      { $sort: paginator.sort },
      { $skip: Number(paginator.offset) },
      { $limit: Number(paginator.itemPerPage) },
      { $lookup: createByLookup },
      { $unwind: `\$${ createByLookup.as }` },
      { $lookup: typesLookup },
      { $lookup: abilitiesLookup },
      {
        $project: {
          name: 1,
          pokedexNumber: 1,
          'createdBy.name': 1,
          createdAt: 1,
          generation: 1
        }
      }
    ]
  );
}

const activePokemon  = async (pokemonId, status) => {
  const { active } = status;
  return await Pokemon.updateOne(
    { _id: Types.ObjectId(pokemonId) },
    { $set: { active } }
  );
}

const updatePokemon = async (pokemonId, pokemon) => {
  return await Pokemon.updateOne(
    { _id: Types.ObjectId(pokemonId) },
    { 
      $set: pokemon
    }
  );
}

module.exports = {
  createPokemon,
  getPokemon,
  getAllPokemons,
  getAllPokemonsByUser,
  getTotalPokemons,
  getTotalPokemonsByUser,
  activePokemon,
  updatePokemon
}
