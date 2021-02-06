const { getRole, updateRole } = require('../../services/roles.service');
const {
  successResponse,
  internalServerError,
  notFoundError
} = require('../../../../utils/result-response/result-response.utils');

const updateRoleController = async(req, res) => {
  const roleId = req.params.id;
  const { name } = req.body;
  try {
    const role = await getRole(roleId);
    if (!role) {
      return notFoundError(res);
    }
    await updateRole(roleId, { name });
    return successResponse(res, role);
  } catch (error) {
    return internalServerError(res, error);
  }
}

module.exports = {
  updateRoleController
}
