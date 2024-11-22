import { Schema, model } from 'mongoose';

const postSchema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        url: {
            type: String, // url
        },
    },
    { timestamps: true }
);

const Post = model('Post', postSchema);

export default Post;
