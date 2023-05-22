const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    post_id: String,
    commenter_id: String,
    post_type: String,
    repost_id: String,
    tweet_id: String,
    is_parent: {type: Boolean},
    child_comment_id:{type: String},
    commenter_image: {type: String},
    commenter_fullname: {type: String},
    commenter_username: {type: String},
    comment_body_text: {type: String},
    total_likes: {type: Number, minimum: 0},
    total_replies: {type: String, default: 0, minimum: 0},
    was_edited: {type: Boolean, default: false},
    post_type: {type: String, enum :['comment']},
    imageUrl: {type: String}
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("Comment", schema);