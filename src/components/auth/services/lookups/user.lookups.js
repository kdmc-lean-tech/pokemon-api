
module.exports = {
  userLookup: {
    from: 'roles',
    localField: 'roleId',
    foreignField: '_id',
    as: 'roleId'
  }
}
