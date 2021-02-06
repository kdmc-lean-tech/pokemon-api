const dotenv = require('dotenv');
dotenv.config();

const keys = new Map();

keys.set('PORT', process.env.PORT);
keys.set('MONGO_URI', process.env.MONGO_URI);
keys.set('JWT_SECRET_KEY', process.env.JWT_SECRET_KEY);
keys.set('JWT_EXPIRES_IN', process.env.JWT_EXPIRES_IN);

module.exports = {
  keys
}
