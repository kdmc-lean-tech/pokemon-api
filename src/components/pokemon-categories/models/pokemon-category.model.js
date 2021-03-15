const { Schema, model } = require('mongoose');

const PokemonCategorySchema = new Schema({
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

module.exports = model('PokemonCategories', PokemonCategorySchema);
