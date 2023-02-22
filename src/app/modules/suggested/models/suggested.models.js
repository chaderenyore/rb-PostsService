const mongoose = require('mongoose');

const schema = mongoose.Schema(
  {
    user_id: String,
    email: String,
    username: String,
  },
  {
    timestamps: { createdAt: 'suggested_at', updatedAt: 'refreshed_at' },
  }
);

module.exports = mongoose.model('SuggestedModel', schema);
