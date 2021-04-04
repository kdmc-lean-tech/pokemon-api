const { searchPermissions } = require('../../services/permissions.service');
const {
  successResponse,
  internalServerError
} = require('../../../../utils/result-response/result-response.utils');

const searchPermissionsController = (req, res) => {
  const search = req.params.search;
  try {
    const permissions = await searchPermissions(search);
    return successResponse(res, permissions);
  } catch (error) {
    return internalServerError(res, error);
  }
}

module.exports = {
  searchPermissionsController
}
