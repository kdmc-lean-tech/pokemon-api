const { getAllRoles, getCountRoles } = require('../../services/roles.service');
const {
  successResponse,
  internalServerError
} = require('../../../../utils/result-response/result-response.utils');
const {
  paginatorTransformer
} = require('../../../../utils/paginator-transformer/paginator-transformer.utils');

const getAllRolesController = async(req, res) => {
  const queries = req.query;
  try {
    const paginator = paginatorTransformer(queries);
    const roles = await getAllRoles(paginator);
    const count = await getCountRoles();
    paginator.count = count;
    return successResponse(res, { results: roles, paginator });
  } catch (error) {
    return internalServerError(res, error);
  }
}

module.exports = {
  getAllRolesController
}
