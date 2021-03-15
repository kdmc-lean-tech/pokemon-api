const { Schema, model } = require('mongoose');

const ImageSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  key: {
    type: String,
    required: true
  },
  contentType: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: false
  },
  active: {
    type: Boolean,
    required: true,
    default: true
  }
}, {
  timestamps: true
});

module.exports = model('Image', ImageSchema);
