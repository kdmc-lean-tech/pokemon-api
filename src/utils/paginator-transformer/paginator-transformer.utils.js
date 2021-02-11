
const {
  convertSortQueryParams
} = require('../sort-query-params-transformer/sort-query-params.utils');

module.exports = {
  paginatorTransformer: (queries) => {
    let { page, itemPerPage, sort, search } = queries;
    page ? page : 1;
    itemPerPage ? itemPerPage : 10;
    search ? search : '';
    const offset = page * itemPerPage - itemPerPage;
    const sortFormat = convertSortQueryParams(sort);
    return {
      page,
      itemPerPage,
      offset,
      sort: sortFormat,
      search
    }
  }
}
