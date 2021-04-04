const { createPermission } = require('../../services/permissions.service');
const {
  createdReponse,
  internalServerError
} = require('../../../../utils/result-response/result-response.utils');

const createPermissionController = async (req, res) => {
  const body = req.body;
  try {
    const permission = await createPermission(body);
    return createdReponse(res, permission);
  } catch (error) {
    return internalServerError(res, error);
  }
}

module.exports = {
  createPermissionController
}
