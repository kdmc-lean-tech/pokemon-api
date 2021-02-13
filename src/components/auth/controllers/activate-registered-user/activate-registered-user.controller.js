const {
  successResponse,
  internalServerError,
  unauthorizedError
} = require('../../../../utils/result-response/result-response.utils');
const { verifyToken } = require('../../../../utils/jwt/jwt.utils');
const { activeUserByEmail } = require('../../services/auth.service');

const activateRegisteredUserController = async (req, res) => {
  const token = req.headers.token;
  try {
    const { payload } = await verifyToken(token);
    if (!payload) {
      return unauthorizedError(res, `You do not have permission to perform this action.`);
    }
    const { email } = payload;
    try {
      await activeUserByEmail(email);
      return successResponse(res);
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
