const { convertSortQueryParams } = require('./sort-query-params.utils');

test(`It should return an object from an input string with the following format:
  {createdAt:1, name:-1}`, () => {
    const sort = '{createdAt:1, name:-1}';
    expect(convertSortQueryParams(sort)).toEqual({createdAt:1,name:-1});
});

test(`It should return an {} from an input string with the following
  format: {createdAt:1,name:-1}`, () => {
    const sort = '{createdAt:1,name:-1}';
    expect(convertSortQueryParams(sort)).toEqual({});
});

test(`It should return an object from an input string with the following
  format: {createdAt:1}`, () => {
    const sort = '{createdAt:1}';
    expect(convertSortQueryParams(sort)).toEqual({createdAt:1});
});
