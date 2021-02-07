const {
  successResponse,
  internalServerError
} = require('../../../../utils/result-response/result-response.utils');
const { verifyToken } = require('../../../../utils/jwt/jwt.utils');
const { getUser, changePassword } = require('../../services/auth.service');
const { EmailSmtp } = require('../../../../shared/email/email');

const changePasswordController = async (req, res) => {
  const token = req.headers.token;
  const { password } = req.body;
  const emailSmtp = new EmailSmtp();
  try {
    const { payload } = await verifyToken(token);
    if (!payload) {
      return unauthorizedError(res, `You do not have permission to perform this action.`);
    }
    const { _id } = payload;
    try {
      const user = await getUser(_id);
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
