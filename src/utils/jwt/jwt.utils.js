const { sign, verify } = require('jsonwebtoken');
const { keys } = require('../../config/keys.config');

const generateToken = (payload) => {
  return sign(
    { payload },
    keys.get('JWT_SECRET_KEY'),
    { expiresIn: keys.get('JWT_EXPIRES_IN')
  });
}

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    verify(token, keys.get('JWT_SECRET_KEY'), (err, decoded) => {
      if (err) {
        return reject(err.message);
      }
      return resolve(decoded);
    });
  });
}

module.exports = {
  generateToken,
  verifyToken
}
