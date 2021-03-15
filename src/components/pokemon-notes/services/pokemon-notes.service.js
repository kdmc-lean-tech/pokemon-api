const PokemonNotes  = require('../models/pokemon-notes.model');

const createNote = async (note) => {
  return await PokemonNotes.create(note);
}

module.exports = {
  createNote
}
