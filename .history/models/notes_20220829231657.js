import mongoose from "mongoose";
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tags" }],

  categoryID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },

  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  userName: {
    type: String,
  },
  userEmail: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
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
export default mongoose.model("Note", noteSchema);
