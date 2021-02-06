const { Schema } = require('mongoose');

export const PokemonStatisticsSchema = new Schema({
  attack: {
    type: Number,
    required: true
  },
  baseEggSteps: {
    type: Number,
    required: true
  },
  baseHappines: {
    type: Number,
    required: true
  },
  baseTotal: {
    type: Number,
    required: true
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
