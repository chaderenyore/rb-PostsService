const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    added_by: String,
    words: Array,
    use_count: String
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("BannedWord", schema);