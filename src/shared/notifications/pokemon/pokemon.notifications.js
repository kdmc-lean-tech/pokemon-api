const { BehaviorSubject } = require('rxjs');

const createPokemonNotification = new BehaviorSubject(null);

module.exports = {
  createPokemonNotification
}
