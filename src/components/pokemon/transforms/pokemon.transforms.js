
const addClosingTime = (pokemon) => {
  const closingDate = new Date();
  closingDate.setHours(closingDate.getHours() + 12);
  return {
    ...pokemon,
    closingDate
  }
}

module.exports = {
  addClosingTime
}
