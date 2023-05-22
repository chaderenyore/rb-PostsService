const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    poster_id: String,
    post_id: String,
    community_id:String,
    reposter_id: {type: String},
    repposted_title: {type: String},
    reposted_body_text: {type: String},
    total_likes: {type: Number, default: 0, minimum: 0},
    total_comments: {type: Number, default: 0, minimum: 0},
    total_times_reposted: {type: Number, default: 0, minimum: 0},
    total_posts_tweets: {type: Number, minimum: 0},
    was_edited: {type: Boolean, default: false},
    is_blocked: {type: Boolean, default: false},
    is_visible: {type: Boolean},
    is_reported: {type: Boolean},
    original_is_reported: {type: Boolean, default:false},
    original_is_banned: {type: Boolean, default:false},
    original_is_deleted: {type: Boolean, default:false},
    original_post_isVisible: {type: Boolean, default: true},
    number_of_times_reported: {type: Number}
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("RePost", schema);
