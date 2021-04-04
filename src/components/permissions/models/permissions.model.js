const { Schema, model } = require('mongoose');

const PermissionsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  codename: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = model('Permission', PermissionsSchema);
