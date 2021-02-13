const {
  successResponse,
  internalServerError
} = require('../../../../utils/result-response/result-response.utils');
const { verifyToken } = require('../../../../utils/jwt/jwt.utils');
const { getUserByEmail, changePassword } = require('../../services/auth.service');
const { EmailSmtp } = require('../../../../shared/email/email');

const changePasswordController = async (req, res) => {
  const password = req.headers.password;
  const { email } = req.body;
  const emailSmtp = new EmailSmtp();
  try {
    try {
      const user = await getUserByEmail(email);
      if (!user) {
        return unauthorizedError(res, `You do not have permission to perform this action.`);
      }
      await changePassword(password, user);

      emailSmtp.sendEmail(
        [user.email],
        `${ user.name } your password was successfully updated.`,
        'notification',
        { 
          titleNotification: 'Updated password',
          message: `Hello ${ user.name }, your password has been successfully updated on the platform.`
        }
      );

      return successResponse(res, null, `The password was successfully changed.`);
    } catch (error) {
      return internalServerError(res, error);
    }
  } catch (error) {
    return internalServerError(res, error);
  }
}

module.exports = {
  changePasswordController
}
