const {
  updatePermission,
  getPermission
} = require('../../services/permissions.service');
const {
  successResponse,
  internalServerError,
  notFoundError
} = require('../../../../utils/result-response/result-response.utils');

const updatePermissionController = async (req, res) => {
  const permissionId = req.params.id;
  const body = req.body;
  try {
    const permission = await getPermission(permissionId);
    if (!permission) {
      return notFoundError(res);
    }
    await updatePermission(permissionId, body);
    return successResponse(res, permission);
  } catch (error) {
    return internalServerError(res, error);
  }
}

module.exports = {
  updatePermissionController
}
