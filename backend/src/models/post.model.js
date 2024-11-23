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
        },
        url: {
            type: String,
            required: true,
        },
        images: [
            {
                type: {
                    url: String,
                    public_id: String,
                }, // URL
            },
        ],
        videos: [
            {
                type: {
                    url: String,
                    public_id: String,
                }, // URL
            },
        ],
    },
    { timestamps: true }
);

const Post = model('Post', postSchema);

export default Post;
