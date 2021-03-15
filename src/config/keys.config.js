const dotenv = require('dotenv');
dotenv.config();

const keys = new Map();

keys.set('PORT', process.env.PORT);
keys.set('MONGO_URI', process.env.MONGO_URI);
keys.set('JWT_SECRET_KEY', process.env.JWT_SECRET_KEY);
keys.set('JWT_EXPIRES_IN', process.env.JWT_EXPIRES_IN);
keys.set('PASSWORD_SMTP_AWS', process.env.PASSWORD_SMTP_AWS);
keys.set('USER_SMTP_AWS', process.env.USER_SMTP_AWS);
keys.set('HOST_SMTP', process.env.HOST_SMTP);
keys.set('ADMIN_SERVER_EMAIL', process.env.ADMIN_SERVER_EMAIL);
keys.set('URL_FRONTEND', process.env.URL_FRONTEND);
keys.set('AWS_ACCESS_KEY_ID', process.env.AWS_ACCESS_KEY_ID);
keys.set('AWS_SECRET_ACCESS_KEY', process.env.AWS_SECRET_ACCESS_KEY);

module.exports = {
  keys
}
