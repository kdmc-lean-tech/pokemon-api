const { Schema } = require('mongoose');

const PokemonStatisticsSchema = new Schema({
  attack: {
    type: Number,
    default: 0
  },
  defense: {
    type: Number,
    required: true
  },
  hp: {
    type: Number,
    required: true
  },
  spAttack: {
    type: Number,
    required: true
  },
  spDefense: {
    type: Number,
    required: true
  }
});

module.exports = {
  PokemonStatisticsSchema
}
