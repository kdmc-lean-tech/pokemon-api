const { verifyToken } = require('../../utils/jwt/jwt.utils');
const {
  unauthorizedError
} = require('../../utils/result-response/result-response.utils');
const { getRole } = require('../../components/roles/services/roles.service');
const { getUser } = require('../../components/auth/services/auth.service');

const authValidator = (roles) => {
  return async (req, res, next) => {
    const token  = req.headers.token;
    try {
      const { payload }= await verifyToken(token);

      if (!payload) {
        return unauthorizedError(res, `You do not have permission to perform this action.`);
      }

      const { roleId, active, _id } = payload;
      if (!active) {
        return unauthorizedError(res, `The user is not active on the platform.`);
      }

      const userRole = await getRole(roleId._id);
      const roleExist = roles.find(role => role === userRole.name);

      if (!roleExist) {
        return unauthorizedError(res, `You do not have permission to perform this action.`);
      }

      const user = await getUser(_id);
      req.user = user;
    } catch (error) {
      return unauthorizedError(res, error);
    }
    next();
  }
}

module.exports = {
  authValidator
}
