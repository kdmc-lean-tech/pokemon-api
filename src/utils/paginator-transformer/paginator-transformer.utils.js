
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
      page: Number(page),
      itemPerPage: Number(itemPerPage),
      offset,
      sort: sortFormat,
      search
    }
  },

  paginatorScroll: (queries) => {
    const { page, itemPerPage } = queries;
    const offset = page * itemPerPage - itemPerPage;
    return {
      page: Number(page),
      limit: Number(itemPerPage),
      offset
    }
  }
}
