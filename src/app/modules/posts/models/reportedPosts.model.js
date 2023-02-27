const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    post_id: String,
    reporter_id: {type: String},
    original_is_deleted: {type: Boolean, default:false},
    report_narration: {type: String}
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("ReportedPost", schema);
