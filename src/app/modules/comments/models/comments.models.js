const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    post_id: String,
    comment_id: String,
    user_id: String,
    email: String,
    username: String
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("CommentsModel", schema);