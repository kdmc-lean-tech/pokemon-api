const { Schema, model, Types } = require('mongoose');

const UserSchema = new Schema({
  name: {
    type: String,
    required: true 
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  roleId: {
    type: Types.ObjectId,
    ref: 'Role',
    required: true
  },
  active: {
    type: Boolean,
    default: false
  },
  online: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = model('User', UserSchema);
