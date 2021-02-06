const { getRole } = require('../../services/roles.service');
const {
  successResponse,
  internalServerError,
  notFoundError
} = require('../../../../utils/result-response/result-response.utils');

const getRoleController = async(req, res) => {
  const roleId = req.params.id;
  try {
    const role = await getRole(roleId);
    if (!role) {
      return notFoundError(res);
    }
    return successResponse(res, role);
  } catch (error) {
    return internalServerError(res, error);
  }
}

module.exports = {
  getRoleController
}
