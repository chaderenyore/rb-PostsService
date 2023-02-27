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
    total_comments: {type: Number, default: 0},
    total_times_reposted: {type: Number, default: 0},
    total_posts_tweets: {type: Number},
    is_sponsored: {type: Boolean, default: false},
    was_edited: {type: Boolean, default: false},
    is_visible: {type: Boolean, default: true},
    is_banned: {type: Boolean, default:false},
    is_reported: {type: Boolean, default:false},
    report_narration: {type: String},
    report_count: {type: Number, default: 0}
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("RecycleBin", schema);
