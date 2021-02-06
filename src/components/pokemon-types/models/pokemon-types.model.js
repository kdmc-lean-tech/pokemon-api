const { Schema, model } = require('mongoose');

const PokemonTypesSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = model('PokemonTypes', PokemonTypesSchema);
