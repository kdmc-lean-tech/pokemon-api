const { getModules, getCountModules } = require('../../services/module.service');
const {
  successResponse,
  internalServerError
} = require('../../../../utils/result-response/result-response.utils');
const {
  paginatorTransformer
} = require('../../../../utils/paginator-transformer/paginator-transformer.utils');

const getModulesController = async (req, res) => {
  const queries = req.query;
  try {
    const paginator = paginatorTransformer(queries);
    const modules = await getModules(paginator);
    const count = await getCountModules(paginator);
    paginator.count = count;
    return successResponse(res, { results: modules, paginator });
  } catch (error) {
    return internalServerError(res, error);
  }
}

module.exports = {
  getModulesController
}
