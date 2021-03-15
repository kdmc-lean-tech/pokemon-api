const { Schema, model, Types } = require('mongoose');
const { PokemonStatisticsSchema } = require('./pokemon-statistics.model');

const PokemonSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
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
  types: [
    {
      type: Types.ObjectId,
      ref: 'PokemonTypes',
      required: true
    }
  ],
  pokedexNumber: {
    type: Number,
    required: true,
    unique: true
  },
  height: {
    type: Number,
    required: true
  },
  abilities: [
    {
      type: Types.ObjectId,
      ref: 'PokemonAbilities',
      required: true
    }
  ],
  pokemonStatistics: {
    type: PokemonStatisticsSchema,
    required: true
  },
  createdBy: {
    type: Types.ObjectId,
    ref: 'User',
    required: true
  },
  active: {
    type: Boolean,
    default: true
  },
  description: {
    type: String,
    required: true
  },
  avatar: {
    type: Types.ObjectId,
    ref: 'Image'
  },
  status: {
    type: String,
    enum: ['REJECTED', 'APPROVED', 'PENDING', 'EXPIRED'],
    default: 'PENDING'
  },
  categories: [
    {
      type: Types.ObjectId,
      ref: 'PokemonCategories',
      required: true
    }
  ],
  closingDate: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

module.exports = model('Pokemon', PokemonSchema);
