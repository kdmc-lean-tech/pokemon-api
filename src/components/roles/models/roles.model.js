const { Schema, model } = require('mongoose');

const RoleSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  modules: [
    {
      name: {
        type: String,
        required: true,
        unique: true
      }
    }
  ],
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = model('Role', RoleSchema);
