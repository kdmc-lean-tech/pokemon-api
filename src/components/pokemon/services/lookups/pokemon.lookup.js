
const createByLookup = {
  from: 'users',
  localField: 'createdBy',
  foreignField: '_id',
  as: 'createdBy'
}

const typesLookup = {
  from: 'pokemontypes',
  localField: 'types',
  foreignField: '_id',
  as: 'types'
}

const abilitiesLookup = {
  from: 'pokemonabilities',
  localField: 'abilities',
  foreignField: '_id',
  as: 'abilities'
}

const avatarLookup = {
  from: 'images',
  localField: 'avatar',
  foreignField: '_id',
  as: 'avatar'
}

const statusLookup = {
  from: 'pokemonstatuses',
  localField: 'status',
  foreignField: '_id',
  as: 'status'
}

const categoriesLookup = {
  from: 'pokemoncategories',
  localField: 'categories',
  foreignField: '_id',
  as: 'categories'
}

const prevEvolutionLookup = {
  from: 'pokemons',
  localField: 'prevEvolution',
  foreignField: '_id',
  as: 'prevEvolution'
}

const nextEvolutionLookup = {
  from: 'pokemons',
  localField: 'nextEvolution',
  foreignField: '_id',
  as: 'nextEvolution'
}

module.exports = {
  createByLookup,
  typesLookup,
  categoriesLookup,
  abilitiesLookup,
  avatarLookup,
  statusLookup,
  prevEvolutionLookup,
  nextEvolutionLookup
}
