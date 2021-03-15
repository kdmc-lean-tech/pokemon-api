
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
  }
}
