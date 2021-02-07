const { registerUser, getUserByEmail } = require('../../services/auth.service');
const {
  successResponse,
  internalServerError,
  clientError
} = require('../../../../utils/result-response/result-response.utils');
const { EmailSmtp } = require('../../../../shared/email/email');
const { generateToken } = require('../../../../utils/jwt/jwt.utils');

const registerController = async (req, res) => {
  const user = req.body;
  const { email } = user;
  const emailSmtp = new EmailSmtp();
  try {
    const userExist = await getUserByEmail(email);
    if (userExist) {
      return clientError(res, `The user with email ${ email } already exists.`);
    }
    const newUser = await registerUser(user);
    const message = `Hello ${ user.name }, please go to the link provided to complete the registration on the platform.`;
    const tokenActiveUser = generateToken(newUser);
    const url = `url-frontend/${ tokenActiveUser }`;
    emailSmtp.sendEmail(
      [email],
      `Please active your user ${ user.name }`,
      'active-user',
      { message, url }
    );
    return successResponse(res, newUser);
  } catch (error) {
    return internalServerError(res, error);
  }
}

module.exports = {
  registerController
}
