const { getPermissions, getCountPermissions } = require('../../services/permissions.service');
const {
  successResponse,
  internalServerError
} = require('../../../../utils/result-response/result-response.utils');
const {
  paginatorTransformer
} = require('../../../../utils/paginator-transformer/paginator-transformer.utils');

const getPermissionsController = async (req, res) => {
  const queries = req.query;
  try {
    const paginator = paginatorTransformer(queries);
    const permissions = await getPermissions(paginator);
    const count = await getCountPermissions(paginator);
    paginator.count = count;
    return successResponse(res, { results: permissions, paginator });
  } catch (error) {
    return internalServerError(res, error);
  }
}

module.exports = {
  getPermissionsController
}
