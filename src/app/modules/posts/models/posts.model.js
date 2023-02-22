const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    poster_id: String,
    poster_fullname: {type: String},
    poster_username: {type: String},
    poster_image: {type: String},
    post_title: {type: String},
    post_body_text: {type: String},
    post_image:{type: String},
    post_video: {type: String},
    total_likes: {type: Number, default: 0},
    total_comments: {type: String, default: 0},
    total_reposted_times: {type: Number, default: 0},
    total_tweets: {type: Number},
    is_sponsored: {type: Boolean, default: false},
    was_edited: {type: Boolean, default: false},
    is_blocked: {type: Boolean, default: false},
    is_reported: {type: Boolean},
    report_narration: {type: String}
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("Post", schema);