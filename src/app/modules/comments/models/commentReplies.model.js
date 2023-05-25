const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    comment_id: String,
    user_id: String,
    user_image: {type: String},
    user_fullname: {type: String},
    user_username: {type: String},
    reply_body_text: {type: String},
    total_likes: {type: String, default:0, minimum: 0},
    total_replies: {type: Number, default: 0, minimum: 0},
    was_edited: {type: Boolean, default: false},
    post_type: {type: String, enum :['reply']},
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("CommentReply", schema);