const { Schema } = require('mongoose');

export const PokemonAgainstSchema = new Schema({
  bug: {
    type: Number,
    required: true
  },
  dark: {
    type: Number,
    required: true
  },
  dragon: {
    type: Number,
    required: true
  },
  electric: {
    type: Number,
    required: true
  },
  fairy: {
    type: Number,
    required: true
  },
  fligth: {
    type: Number,
    required: true
  },
  fire: {
    type: Number,
    required: true
  },
  flying: {
    type: Number,
    required: true
  },
  ghost: {
    type: Number,
    required: true
  },
  grass: {
    type: Number,
    required: true
  },
  ground: {
    type: Number,
    required: true
  },
  ice: {
    type: Number,
    required: true
  },
  normal: {
    type: Number,
    required: true
  },
  poison: {
    type: Number,
    required: true
  },
  psychic: {
    type: Number,
    required: true
  },
  rock: {
    type: Number,
    required: true
  },
  steel: {
    type: Number,
    required: true
  },
  water: {
    type: Number,
    required: true
  }
});
