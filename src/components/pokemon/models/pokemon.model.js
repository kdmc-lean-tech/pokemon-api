const { Schema, model, Types } = require('mongoose');
const { PokemonAgainstSchema } = require('./pokemon-against.model');
const { PokemonStatisticsSchema } = require('./pokemon-statistics.model');

const PokemonSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  isLegendary: {
    type: Boolean,
    required: true
  },
  generation: {
    type: Number,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  typeOne: {
    type: Types.ObjectId,
    ref: 'PokemonTypes'
  },
  typeTwo: {
    type: Types.ObjectId,
    ref: 'PokemonTypes'
  },
  speed: {
    type: Number,
    required: true
  },
  pokedexNumber: {
    type: Number,
    required: true
  },
  japaneseName: {
    type: String,
    required: true
  },
  height: {
    type: Number,
    required: true
  },
  classification: {
    type: Types.ObjectId,
    ref: 'PokemonClassification'
  },
  abilities: [
    {
      type: Types.ObjectId,
      ref: 'PokemonAbilities'
    }
  ],
  pokemonAgainst: {
    type: PokemonAgainstSchema,
    required: true
  },
  pokemonStatistics: {
    type: PokemonStatisticsSchema,
    required: true
  }
}, {
  timestamps: true
});

module.exports = model('Pokemon', PokemonSchema);
