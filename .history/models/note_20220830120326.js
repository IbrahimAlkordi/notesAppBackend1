const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],

  categoryID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },

  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
//index for getNotes
noteSchema.index({ category: -1, creatorID: -1, tags: -1 });
noteSchema.index({ creatorID: -1, tags: -1 });
noteSchema.index({ category: -1, creatorID: -1 });
//compund schema index for aggregation
noteSchema.index({
  creatorID: -1,
  creatorName: -1,
});
module.exports = mongoose.model("Note", noteSchema);
