
module.exports = {
  
  createByLookup: {
    from: 'users',
    let: { name: '$name' },
    pipeline: [
      {
        $project: {
          name: 1
        }
      }
    ],
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
  }
}
