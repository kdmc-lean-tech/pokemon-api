const { Schema, model, Types } = require('mongoose');

const PokemonNotesSchema = new Schema({
  note: {
    type: String,
    required: true
  },
  createdBy: {
    type: Types.ObjectId,
    ref: 'User',
    required: true
  },
  pokemon: {
    type: Types.ObjectId,
    ref: 'Pokemon',
    required: true
  }
}, {
  timestamps: true
});

module.exports = model('PokemonNotes', PokemonNotesSchema);
