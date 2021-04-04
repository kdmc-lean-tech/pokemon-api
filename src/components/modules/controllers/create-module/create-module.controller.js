const { createModule } = require('../../services/module.service');
const {
  successResponse,
  internalServerError
} = require('../../../../utils/result-response/result-response.utils');

const createModuleController = async (req, res) => {
  const body = req.body;
  try {
    const module = await createModule(body);
    return successResponse(res, module);
  } catch (error) {
    return internalServerError(res, error);
  }
}

module.exports = {
  createModuleController
}
