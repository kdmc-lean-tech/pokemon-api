const { getModule } = require('../../services/module.service');
const {
  successResponse,
  internalServerError,
  notFoundError
} = require('../../../../utils/result-response/result-response.utils');

const getModuleController = async (req, res) => {
  const moduleId = req.params.id;
  try {
    const module = await getModule(moduleId);
    if (!module) {
      return notFoundError(res);
    }
    return successResponse(res, module);
  } catch (error) {
    return internalServerError(res, error);
  }
}

module.exports = {
  getModuleController
}
