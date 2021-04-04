const { searchModules } = require('../../services/module.service');
const {
  successResponse,
  internalServerError
} = require('../../../../utils/result-response/result-response.utils');

const searchModuleController = async (req, res) => {
  const query = req.params.query;
  const search = query;
  try {
    const modules = await searchModules(search);
    return successResponse(res, modules);
  } catch (error) {
    return internalServerError(res, error);
  }
}

module.exports = {
  searchModuleController
}
