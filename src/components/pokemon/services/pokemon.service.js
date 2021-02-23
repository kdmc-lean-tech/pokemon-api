const { Types } = require('mongoose');
const Pokemon = require('../models/pokemon.model');
const {
  createByLookup,
  typesLookup,
  abilitiesLookup,
} = require('./lookups/pokemon.lookup');

const createPokemon = async (pokemon, userId) => {
  pokemon.createdBy = userId;
  const newPokemon = new Pokemon(pokemon);
  return await newPokemon.save();
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
    { $lookup: createByLookup },
    { $unwind: `\$${ createByLookup.as }` },
    { $match: 
      {
        $and: [
          { $or:
            [
              { name: { $regex: paginator ? paginator.search : '', $options: 'i' } },
              { pokedexNumber: paginator ? Number(paginator.search) : '' },
              { generation: paginator ? Number(paginator.search) : '' },
              { 'createdBy.name': { $regex: paginator ? paginator.search : '', $options: 'i' } }
            ]
          },
          { active: true }
        ]
      }
    },
    { $skip: Number(paginator.offset) },
    { $limit: Number(paginator.itemPerPage) },
    { $sort: paginator.sort },
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
    { $lookup: createByLookup },
    { $unwind: `\$${ createByLookup.as }` },
    { $match: 
      {
        $and: [
          { $or:
            [
              { name: { $regex: paginator ? paginator.search : '', $options: 'i' } },
              { pokedexNumber: paginator ? Number(paginator.search) : '' },
              { generation: paginator ? Number(paginator.search) : '' },
              { 'createdBy.name': { $regex: paginator ? paginator.search : '', $options: 'i' } }
            ]
          },
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
  getTotalPokemons,
  activePokemon,
  updatePokemon
}
