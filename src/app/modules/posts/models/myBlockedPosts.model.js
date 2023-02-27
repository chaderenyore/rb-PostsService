const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    poster_id: String,
    post_id: String,
    blocker_id: {type: String},
    poster_username: {type: String},
    original_is_banned: {type: Boolean, default:false},
    original_is_deleted: {type: Boolean, default:false},
    original_post_isVisible: {type: Boolean, default: true},
    block_narration: {type: String}
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("BlockedPost", schema);
