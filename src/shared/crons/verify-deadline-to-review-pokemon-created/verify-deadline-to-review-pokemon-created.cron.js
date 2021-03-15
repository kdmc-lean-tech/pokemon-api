const { CronJob } = require('cron');
const {
  getPokemonsWithStatusPending,
  setStatusInPokemonCreated
} = require('../../../components/pokemon/services/pokemon.service');

const verifyDeadlineToReviewPokemonCreated = new CronJob(
  '10 */1 * * * *',
  () => verifyClosingDatePokemonCreated()
);

const verifyClosingDatePokemonCreated = async () => {
  const pokemonsPending = await getPokemonsWithStatusPending();
  pokemonsPending.forEach(pokemon => {
    if (
      new Date(pokemon.closingDate).getTime() <= new Date().getTime()
    ) {
      setStatusInPokemonCreated(pokemon._id, 'EXPIRED');
    }
  });
}

module.exports = {
  verifyDeadlineToReviewPokemonCreated
}
