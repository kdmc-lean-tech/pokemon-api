const {
  verifyDeadlineToReviewPokemonCreated
} = require('../crons/verify-deadline-to-review-pokemon-created/verify-deadline-to-review-pokemon-created.cron');

const startCrons = () => {
  verifyDeadlineToReviewPokemonCreated.start();
}

module.exports = {
  startCrons
}
