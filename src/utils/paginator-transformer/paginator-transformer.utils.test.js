const { paginatorTransformer } = require('./paginator-transformer.utils');

test(`It should return an object with the following format:`, () => {
  /*
    Input Format:
      page: 1,
      itemPerPage: 10,
      sort: '{createdAt:1, name: -1}',
      search: '',
    Output Format:
      page: 1,
      itemPerPage: 10,
      offset: 0,
      sort: {createAt:1, name:-1},
      search: ''
  */
  const queries = {
    page: 1,
    itemPerPage: 10,
    sort: '{createdAt:1, name:-1}',
    search: ''
  };
  expect(paginatorTransformer(queries)).toEqual({
    page: 1,
    itemPerPage: 10,
    offset: 0,
    sort: {createdAt:1, name:-1},
    search: ''
  });
});

test(`It should return an object with the offset equal to 5`, () => {
  const queries = {
    page: 2,
    itemPerPage: 5,
    sort: '{createdAt:1, name:-1}',
    search: ''
  };
  expect(paginatorTransformer(queries).offset).toEqual(5);
});
