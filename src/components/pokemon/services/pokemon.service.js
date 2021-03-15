const { Types } = require('mongoose');
const Pokemon = require('../models/pokemon.model');
const { addClosingTime } = require('../transforms/pokemon.transforms');
const {
  createByLookup,
  typesLookup,
  abilitiesLookup,
  avatarLookup
} = require('./lookups/pokemon.lookup');
const PokemonNotes = require('../../pokemon-notes/models/pokemon-notes.model');

const createPokemon = async (pokemon, userId) => {
  pokemon.createdBy = userId;
  return await Pokemon.create(addClosingTime(pokemon));
}

const getPokemon = async (pokemonId) => {
  return await Pokemon.aggregate(
    [
      { $lookup: avatarLookup },
      { $unwind: { path: "$avatar", preserveNullAndEmptyArrays: true } },
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
    { $lookup: avatarLookup },
    { $unwind: { path: "$avatar", preserveNullAndEmptyArrays: true } },
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
        generation: 1,
        'avatar.url': 1
      }
    },
  ]);
}

const getTotalPokemons = async (paginator) => {
  return await Pokemon.aggregate(
   [
    { $lookup: createByLookup },
    { $unwind: `\$${ createByLookup.as }` },
    { $lookup: avatarLookup },
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

const updateAvatarPokemon = async (pokemon, avatar) => {
  pokemon.avatar = avatar._id;
  return await Pokemon.updateOne(
    { _id: Types.ObjectId(pokemon._id) },
    { $set: pokemon }
  );
}

const setStatusInPokemonCreated = async (pokemonId, status) => {
  return await Pokemon.updateOne(
    { _id: Types.ObjectId(pokemonId) },
    { $set: { status } }
  );
}

const approvePokemonCreated = async (pokemonId) => {
  const pokemon = await getPokemon(pokemonId);
  if (pokemon.status === 'PENDING') {
    return await Pokemon.updateOne(
      { _id: Types.ObjectId(pokemonId) },
      { $set: { status: 'APPROVED' } }
    );
  } else {
    return null;
  }
}

const getPokemonsWithStatusPending = async () => {
  return await Pokemon.aggregate(
    [
      { $match:
        {
          $and: [
            { status: { $eq: 'PENDING' } },
            { active: true }
          ]
        }
      }
    ]
  );
}

const reTryCreatePokemon = async (pokemonId) => {
  await setStatusInPokemonCreated(pokemonId, 'PENDING');
  const pokemon = await getPokemon(pokemonId);
  return await updatePokemon(pokemonId, addClosingTime(pokemon));
}

const rejectPokemonCreated = async (pokemonId, note, userId) => {
  await setStatusInPokemonCreated(pokemonId, 'REJECTED');
  const model = {
    note,
    createdBy: userId,
    pokemon: pokemonId
  }
  return await PokemonNotes.create(model);
}

module.exports = {
  createPokemon,
  getPokemon,
  getAllPokemons,
  getTotalPokemons,
  activePokemon,
  updatePokemon,
  updateAvatarPokemon,
  setStatusInPokemonCreated,
  getPokemonsWithStatusPending,
  approvePokemonCreated,
  reTryCreatePokemon,
  rejectPokemonCreated
}
