const {
  genSaltSync,
  hashSync,
  compareSync
} = require('bcryptjs');

const encryptPassword = (password, rounds = 10) => {
  const salt = genSaltSync(rounds);
  return hashSync(password, salt);
}

const comparePassword = (passwordClient, passwordDB) => {
  return compareSync(passwordClient, passwordDB);
}

module.exports = {
  encryptPassword,
  comparePassword
}
