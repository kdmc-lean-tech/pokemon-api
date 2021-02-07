const {
  internalServerError,
  successResponse,
  notFoundError,
  unauthorizedError
} = require('../../../../utils/result-response/result-response.utils');
const { getUserByEmail } = require('../../services/auth.service');
const { generateToken } = require('../../../../utils/jwt/jwt.utils');
const { EmailSmtp } = require('../../../../shared/email/email');

const forgotPasswordController = async (req, res) => {
  const { email } = req.body;
  const emailSmtp = new EmailSmtp();
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return notFoundError(res, `There is no user with the email provided.`);
    }
    if (!user.active) {
      return unauthorizedError(res, `The user is not active on the platform.`);
    }
    const message = `Hello ${ user.name }, please enter the following link to continue the password change process.`;
    const tokenActiveUser = generateToken(user);
    const url = `url-frontend/${ tokenActiveUser }`;
    emailSmtp.sendEmail(
      [email],
      `Change password (Pokemon Api) ${ user.name }`,
      'change-password',
      { message, url }
    );
    return successResponse(res);
  } catch (error) {
    return internalServerError(res, error);
  }
}

module.exports = {
  forgotPasswordController
}
