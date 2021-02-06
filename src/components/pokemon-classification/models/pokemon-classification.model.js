const { Schema, model } = require('mongoose');

const PokemonClassificationSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
},{
  timestamps: true
});

module.exports = model('PokemonClassification', PokemonClassificationSchema);
