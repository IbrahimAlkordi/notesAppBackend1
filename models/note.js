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
  tags: [{ type: String, ref: "Tag" }],

  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  
}, { timestamps: true });

// noteSchema.index({ categoryId: -1, userId: -1, tags: -1 });
// noteSchema.index({ userId: -1, tags: -1 });
// noteSchema.index({ categoryId: -1, userId: -1 });



module.exports = mongoose.model("Note", noteSchema);
