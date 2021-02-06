const { createRole } = require('../../services/roles.service');
const {
  successResponse,
  internalServerError
} = require('../../../../utils/result-response/result-response.utils');

const createRoleController = async(req, res) => {
  const role = req.body;
  try {
    const newRole = await createRole(role);
    return successResponse(res, newRole);
  } catch (error) {
    return internalServerError(res, error);
  }
}

module.exports = {
  createRoleController
}
