const { Schema, model, Types } = require('mongoose');

const RoleSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  modules: [
    {
      type: Types.ObjectId,
      ref: 'Modules',
      required: true
    }
  ],
  permissions: [
    {
      type: Types.ObjectId,
      ref: 'Permission',
      required: true
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
