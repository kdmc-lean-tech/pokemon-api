const { Schema } = require('mongoose');

export const PokemonStatisticsSchema = new Schema({
  attack: {
    type: Number,
    default: 0
  },
  baseEggSteps: {
    type: Number,
    default: 0
  },
  baseHappines: {
    type: Number,
    default: 0
  },
  baseTotal: {
    type: Number,
    default: 0
  },
  captureRate: {
    type: Number,
    required: true
  },
  defense: {
    type: Number,
    required: true
  },
  experienceGrowth: {
    type: Number,
    required: true
  },
  hp: {
    type: Number,
    required: true
  },
  percentageMale: {
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
