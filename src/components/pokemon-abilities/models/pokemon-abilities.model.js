const { Schema, model } = require('mongoose');

const PokemonAbilitiesSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  active: {
    type: Boolean,
    default: true
  }
},{
  timestamps: true
});

module.exports = model('PokemonAbilities', PokemonAbilitiesSchema);
