const { getUserByEmail, login } = require('../../services/auth.service');
const {
  internalServerError,
  successResponse,
  unauthorizedError
} = require('../../../../utils/result-response/result-response.utils');
const { comparePassword } = require('../../../../utils/bcryptjs/encrypt.utils');

const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return unauthorizedError(res, `Password or Email incorrect.`);
    } 
    if (!comparePassword(password, user.password)) {
      return unauthorizedError(res, `Password or Email incorrect.`);
    }
    const token = login(user);
    return successResponse(res, { token, user });
  } catch (error) {
    return internalServerError(res, error);    
  }
}

module.exports = {
  loginController
}
