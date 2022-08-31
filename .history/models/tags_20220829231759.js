import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const tagSchema = new Schema({
    tagName: {
        type: String,
        required: true,
    },
    usersID: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
    ],
});

tagSchema.index({ tagSchema: -1 });
tagSchema.index({ creatorsID: -1 });
export default mongoose.model('Tags', tagSchema);
