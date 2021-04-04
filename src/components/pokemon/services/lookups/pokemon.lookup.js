
module.exports = {
  
  createByLookup: {
    from: 'users',
    localField: 'createdBy',
    foreignField: '_id',
    as: 'createdBy'
  },

  typesLookup: {
    from: 'pokemontypes',
    localField: 'types',
    foreignField: '_id',
    as: 'types'
  },

  abilitiesLookup: {
    from: 'pokemonabilities',
    localField: 'abilities',
    foreignField: '_id',
    as: 'abilities'
  },

  avatarLookup: {
    from: 'images',
    localField: 'avatar',
    foreignField: '_id',
    as: 'avatar'
  },

  statusLookup: {
    from: 'pokemonstatuses',
    localField: 'status',
    foreignField: '_id',
    as: 'status'
  },

  categoriesLookup: {
    from: 'pokemoncategories',
    localField: 'categories',
    foreignField: '_id',
    as: 'categories'
  },

  prevEvolutionLookup: {
    from: 'pokemons',
    localField: 'prevEvolution',
    foreignField: '_id',
    as: 'prevEvolution'
  },

  nextEvolutionLookup: {
    from: 'pokemons',
    localField: 'nextEvolution',
    foreignField: '_id',
    as: 'nextEvolution'
  }
}
