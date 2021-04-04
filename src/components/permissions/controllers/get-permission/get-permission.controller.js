const { getPermission } = require('../../services/permissions.service');
const {
  successResponse,
  internalServerError,
  notFoundError
} = require('../../../../utils/result-response/result-response.utils');

const getPermissionController = async (req, res) => {
  const permissionId = req.params.id;
  try {
    const permission = await getPermission(permissionId);
    if (!permission) {
      return notFoundError(res);
    }
    return successResponse(res, permission);
  } catch (error) {
    return internalServerError(res, error);
  }
}

module.exports = {
  getPermissionController
}
