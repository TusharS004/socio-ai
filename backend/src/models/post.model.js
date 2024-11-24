import { Schema, model } from 'mongoose';

const postSchema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        content: {
            type: String,
        },
        url: {
            type: String,
        },
        images: [
            {
                type: {
                    url: { type: String, required: true },
                    publicId: { type: String, required: true },
                    _id: false,
                }, // URL
            },
        ],
        videos: [
            {
                type: {
                    url: { type: String, required: true },
                    publicId: { type: String, required: true },
                    _id: false,
                }, // URL
            },
        ],
    },
    { timestamps: true }
);

const Post = model('Post', postSchema);

export default Post;
