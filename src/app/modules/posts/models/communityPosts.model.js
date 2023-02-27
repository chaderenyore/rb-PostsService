const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    poster_id: String,
    poster_fullname: {type: String},
    reposter_id: String,
    twiter_id: String,
    poster_username: {type: String},
    poster_image: {type: String},
    post_title: {type: String},
    original_post_title: {type: String},
    original_post_id: {type: String},
    tweet_id: { type: String},
    re_post_id:{type: String},
    shared_post_id:{type: String}
    post_type: {type: String, enum: ["tweet", "repost", "original", "shared"],},
    total_likes: {type: Number, default: 0},
    total_comments: {type: Number, default: 0},
    total_times_reposted: {type: Number, default: 0},
    total_posts_tweets: {type: Number},
    is_sponsored: {type: Boolean, default: false},
    was_edited: {type: Boolean, default: false},
    is_visible: {type: Boolean, default: true},
    original_post_isVisible: {type: Boolean, default: true},
    is_banned: {type: Boolean, default:false},
    original_is_banned: {type: Boolean, default:false},
    is_reported: {type: Boolean, default:false},
    report_narration: {type: String},
    report_count: {type: Number, default: 0}
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("CommunityPosts", schema);
