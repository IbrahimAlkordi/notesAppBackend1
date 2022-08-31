import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    categoryName: {
        type: String,
        required: true,
        // index: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // index: true,
    },
    userName: {
        type: String,
    },
    userEmail: {
        type: String,
    },
});
//for aggregation in admin.js
categorySchema.index({
    creatorID: -1,
    creatorName: -1,
});
//for find query in category.js
categorySchema.index({ creatorID: -1 });
categorySchema.index({ categoryName: -1 });
categorySchema.index({ updatedDate: -1 });
export default mongoose.model('Category', categorySchema);
