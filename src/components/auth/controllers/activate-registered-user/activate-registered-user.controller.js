const {
  successResponse,
  internalServerError,
  unauthorizedError
} = require('../../../../utils/result-response/result-response.utils');
const { verifyToken, generateToken } = require('../../../../utils/jwt/jwt.utils');
const { activeUser, getUser } = require('../../services/auth.service');

const activateRegisteredUserController = async (req, res) => {
  const token = req.headers.token;
  try {
    const { payload } = await verifyToken(token);
    if (!payload) {
      return unauthorizedError(res, `You do not have permission to perform this action.`);
    }
    const { _id } = payload;
    try {
      await activeUser(_id, { active: true });
      const user = await getUser(_id);
      const tokenLogin = generateToken(user);
      return successResponse(res, { user, token: tokenLogin });
    } catch (error) {
      internalServerError(res, error);
    }
    
  } catch (error) {
    internalServerError(res, error);
  }
}

module.exports = {
  activateRegisteredUserController
}
