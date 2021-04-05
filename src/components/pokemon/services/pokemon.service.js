const { Types } = require('mongoose');
const Pokemon = require('../models/pokemon.model');
const { addClosingTime } = require('../transforms/pokemon.transforms');
const {
  createByLookup,
  avatarLookup,
  statusLookup,
} = require('./lookups/pokemon.lookup');
const { createNote } = require('../../../components/pokemon-notes/services/pokemon-notes.service');
const { getPokemonStatusByName } = require('../../pokemon-status/services/pokemon-status.service');

const createPokemon = async (pokemon, userId) => {
  pokemon.createdBy = userId;
  const status = await getPokemonStatusByName('PENDING');
  pokemon.status = status._id;
  return await Pokemon.create(addClosingTime(pokemon));
}

const getPokemon = async (pokemonId) => {
  return Pokemon.findOne({
    $and: [
      { _id: Types.ObjectId(pokemonId) },
      { active: true }
    ]
  })
  .populate('avatar')
  .populate('createdBy')
  .populate('status')
  .populate('abilities')
  .populate('types')
  .populate('categories')
  .populate({
    path: 'nextEvolution',
    populate: {
      path: 'status',
      select: 'name -_id'
    }
  })
  .populate({
    path: 'nextEvolution',
    populate: {
      path: 'avatar',
      select: 'url -_id'
    }
  })
  .populate({
    path: 'prevEvolution',
    populate: {
      path: 'status',
      select: 'name -_id'
    }
  })
  .populate({
    path: 'prevEvolution',
    populate: {
      path: 'avatar',
      select: 'url -_id'
    },
  });
}

const getAllPokemons = async (paginator) => {
  return await Pokemon.aggregate([
    { $lookup: createByLookup },
    { $unwind: `\$${ createByLookup.as }` },
    { $lookup: avatarLookup },
    { $unwind: { path: '$avatar', preserveNullAndEmptyArrays: true } },
    { $lookup: statusLookup },
    { $unwind: { path: '$status', preserveNullAndEmptyArrays: true } },
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
        'avatar.url': 1,
        'status.name': 1,
        closingDate: 1
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
    { $unwind: { path: '$avatar', preserveNullAndEmptyArrays: true } },
    { $lookup: statusLookup },
    { $unwind: { path: '$status', preserveNullAndEmptyArrays: true } },
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

const searchPokemons = async (search = '') => {
  return await Pokemon.find({
    name: { $regex: search, $options: 'i' }
  })
    .populate({
      path: 'avatar',
      select: 'url'
    })
    .populate({
      path: 'status',
      select: 'name'
    })
    .select('name pokedexNumber')
    .exec();
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
  const statusSearch = await getPokemonStatusByName(status);
  return await Pokemon.updateOne(
    { _id: Types.ObjectId(pokemonId) },
    { $set: { status: statusSearch } }
  );
}

const approvePokemonCreated = async (pokemonId) => {
  const pokemon = await getPokemon(pokemonId);
  const approvedStatus = await getPokemonStatusByName('APPROVED');
  if (pokemon.status.name === 'PENDING') {
    return await Pokemon.updateOne(
      { _id: Types.ObjectId(pokemonId) },
      { $set: { status: approvedStatus } }
    );
  } else {
    return null;
  }
}

const getPokemonsWithStatusPending = async () => {
  return await Pokemon.aggregate(
    [
      { $lookup: statusLookup },
      { $unwind: { path: '$status', preserveNullAndEmptyArrays: true } },
      { $match:
        {
          $and: [
            { 'status.name': { $eq: 'PENDING' } },
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
  return await createNote(model);
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
  rejectPokemonCreated,
  searchPokemons
}
