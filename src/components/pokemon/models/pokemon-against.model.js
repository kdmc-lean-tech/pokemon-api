const { Schema } = require('mongoose');

export const PokemonAgainstSchema = new Schema({
  bug: {
    type: Number,
    default: 0
  },
  dark: {
    type: Number,
    default: 0
  },
  dragon: {
    type: Number,
    default: 0
  },
  electric: {
    type: Number,
    default: 0
  },
  fairy: {
    type: Number,
    default: 0
  },
  fligth: {
    type: Number,
    default: 0
  },
  fire: {
    type: Number,
    default: 0
  },
  flying: {
    type: Number,
    default: 0
  },
  ghost: {
    type: Number,
    default: 0
  },
  grass: {
    type: Number,
    default: 0
  },
  ground: {
    type: Number,
    default: 0
  },
  ice: {
    type: Number,
    default: 0
  },
  normal: {
    type: Number,
    default: 0
  },
  poison: {
    type: Number,
    default: 0
  },
  psychic: {
    type: Number,
    default: 0
  },
  rock: {
    type: Number,
    default: 0
  },
  steel: {
    type: Number,
    default: 0
  },
  water: {
    type: Number,
    default: 0
  }
});
