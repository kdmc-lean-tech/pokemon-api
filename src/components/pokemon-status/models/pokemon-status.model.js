const { Schema, model } = require('mongoose');

const PokemonStatusSchema = new Schema({
  name: {
    type: String,
    enum: ['REJECTED', 'APPROVED', 'PENDING', 'EXPIRED'],
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

module.exports = model('PokemonStatus', PokemonStatusSchema);
