const { getRole, activeRole } = require('../../services/roles.service');
const {
  successResponse,
  internalServerError,
  notFoundError
} = require('../../../../utils/result-response/result-response.utils');

const activeRoleController = async (req, res) => {
  const roleId = req.params.id;
  const status = req.body;
  try {
    const role = await getRole(roleId);
    if (!role) {
      return notFoundError(res);
    }
    await activeRole(roleId, status);
    return successResponse(res, status);
  } catch (error) {
    return internalServerError(res, error);
  }
}

module.exports = {
  activeRoleController
}
