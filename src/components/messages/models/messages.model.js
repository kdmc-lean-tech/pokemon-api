const { Schema, model } = require('mongoose');

const MessageSchema = Schema({
  of: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  message: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: true
  },
  seen: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = model('Message', MessageSchema);
