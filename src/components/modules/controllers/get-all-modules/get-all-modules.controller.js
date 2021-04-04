const { getAllModules } = require('../../services/module.service');
const {
  successResponse,
  internalServerError
} = require('../../../../utils/result-response/result-response.utils');

const getAllModulesController = async (req, res) => {
  try {
    const modules = await getAllModules();
    return successResponse(res, modules);
  } catch (error) {
    return internalServerError(res, error);
  }
}

module.exports = {
  getAllModulesController
}
