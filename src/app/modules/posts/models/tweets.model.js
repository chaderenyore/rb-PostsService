const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    poster_id: String,
    post_id: String,
    twiter_id: {type: String},
    tweet_title: {type: String},
    tweet_body_text: {type: String},
    total_likes: {type: Number, default: 0},
    total_comments: {type: Number, default: 0},
    was_edited: {type: Boolean, default: false},
    is_blocked: {type: Boolean, default: false},
    is_visible: {type: Boolean},
    is_banned: {type: Boolean, default:false},
    original_is_banned: {type: Boolean, default:false},
    original_is_deleted: {type: Boolean, default:false},
    original_post_isVisible: {type: Boolean, default: true},
    is_reported: {type: Boolean},
    report_narration: {type: String}
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("Tweet", schema);
