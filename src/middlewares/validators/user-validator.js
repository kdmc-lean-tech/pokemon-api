const { verifyToken } = require('../../utils/jwt/jwt.utils');
const {
  unauthorizedError,
  internalServerError
} = require('../../utils/result-response/result-response.utils');
const { getRole } = require('../../components/roles/services/roles.service');

const authValidator = (roles) => {
  return async (req, res, next) => {
    const token  = req.headers.token;
    try {
      const { payload }= await verifyToken(token);
      if (!payload) {
        return unauthorizedError(res, `You do not have permission to perform this action.`);
      }
      const { roleId } = payload;
      const userRole = await getRole(roleId);
      const roleExist = roles.find(role => role === userRole.name);
      
      if (!roleExist) {
        return unauthorizedError(res, `You do not have permission to perform this action.`);
      }
    } catch (error) {
      return internalServerError(res, error);
    }
    next();
  }
}

module.exports = {
  authValidator
}
