import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        platform: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
        },
    },
    { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);

export default Post;
