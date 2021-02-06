
module.exports = {
  convertSortQueryParams: (sortQuery) => {
    let sortKeys = {};
    let sortQueryFormat = '';
    sortQueryFormat = sortQuery.substring(1, sortQuery.length - 1);
    if (sortQueryFormat.includes(',')) {
      sortQueryFormat.split(', ').forEach(item => {
        const [ field, order ] = item.split(':');
        sortKeys[field] = Number(order);
      });
    } else {
      const [ field, order ] = sortQueryFormat.split(':');
      sortKeys[field] = Number(order);
    }
    return sortKeys;
  }
}
