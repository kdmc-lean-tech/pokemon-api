
const userOfLookup = {
  from: 'users',
  localField: 'of',
  foreignField: '_id',
  as: 'of'
};

const userToLookup = {
  from: 'users',
  localField: 'to',
  foreignField: '_id',
  as: 'to'
};

module.exports = {
  userOfLookup,
  userToLookup
}
