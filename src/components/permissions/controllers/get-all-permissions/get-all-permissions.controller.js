const { getAllPermissions } = require('../../services/permissions.service');
const {
  successResponse,
  internalServerError
} = require('../../../../utils/result-response/result-response.utils');

const getAllPermissionsController = async (req, res) => {
  try {
    const permissions = await getAllPermissions();
    return successResponse(res, permissions);
  } catch (error) {
    return internalServerError(res, error);
  }
}

module.exports = {
  getAllPermissionsController
}
