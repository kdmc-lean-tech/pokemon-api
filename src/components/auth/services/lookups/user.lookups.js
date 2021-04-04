const roleLookup = {
  from: 'roles',
  localField: 'roleId',
  foreignField: '_id',
  as: 'roleId'
}

const avatarLookup = {
  from: 'images',
  localField:'avatar',
  foreignField: '_id',
  as: 'avatar'
}

module.exports = {
  roleLookup,
  avatarLookup,
}
