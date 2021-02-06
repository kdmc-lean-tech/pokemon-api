const { Schema, model } = require('mongoose');

const PokemonAbilitiesSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
},{
  timestamps: true
});

module.exports = model('PokemonAbilities', PokemonAbilitiesSchema);
