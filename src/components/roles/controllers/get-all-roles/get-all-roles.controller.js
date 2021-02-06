const { getAllRoles } = require('../../services/roles.service');
const {
  successResponse,
  internalServerError
} = require('../../../../utils/result-response/result-response.utils');
const {
  convertSortQueryParams
} = require('../../../../utils/sort-query-params-transformer/sort-query-params.utils');

const getAllRolesController = async(req, res) => {
  const { page, itemPerPage, sort, search } = req.query;
  try {
    const offset = page * itemPerPage - itemPerPage;
    const paginator = {
      offset,
      page,
      itemPerPage,
      sort: convertSortQueryParams(sort),
      search,
    };
    try {
      const roles = await getAllRoles(paginator);
      return successResponse(res, { results: roles, paginator });
    } catch (error) {
      return internalServerError(res, error);
    }
  } catch (error) {
    return internalServerError(res, error);
  }
}

module.exports = {
  getAllRolesController
}
