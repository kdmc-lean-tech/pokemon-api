const { updateModule, getModule } = require('../../services/module.service');
const {
  successResponse,
  internalServerError,
  notFoundError
} = require('../../../../utils/result-response/result-response.utils');

const updateModuleController = async (req, res) => {
  const moduleId = req.params.id;
  const body = req.body;
  try {
    const module = await getModule(moduleId);
    if (!module) {
      return notFoundError(res);
    }
    await updateModule(moduleId, body);
    return successResponse(res);
  } catch (error) {
    return internalServerError(res, error);
  }
}

module.exports = {
  updateModuleController
}
