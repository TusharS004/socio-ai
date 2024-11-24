import Post from '../models/post.model.js';
import { uploadToCloudinary } from '../services/cloudinary.service.js';

export const createPost = async (req, res) => {
    if (!req?.user?._id)
        return res.status(403).json({ message: 'You are not authorized to create this post' });

    try {
        let { content, url, images = [], videos = [] } = req.body;

        if (url) {
            const checExists = await Post.findOne({ url });
            if (checExists)
                return res.status(400).json({ message: 'Post already exists', data: checExists });
        }

        if(!content)
            return res.status(400).json({ message: 'Content is required' });

        if (req?.files) {
            const files = req.files.map(async (file) => {
                const { path } = file;

                const uploadCloud = await uploadToCloudinary(path);

                return uploadCloud;
            });

            images = images.concat((await Promise.all(files)).filter((file) => {
                const ext = file.url.toString().slice(
                    file.url.toString().lastIndexOf('.'), file.url.toString().length
                )
                return ext === '.jpg' || ext === '.jpeg' || ext === '.png';
            }));

            videos = videos.concat((await Promise.all(files)).filter((file) =>
                file.url.toString().slice(
                    file.url.toString().lastIndexOf('.'), file.url.toString().length
                ) === '.mp4'
            ));
        }

        // console.log('images:', images);
        // console.log('videos:', videos);

        const post = new Post({
            content,
            url,
            images,
            videos,
            owner: req.user._id,
        });
        await post.save();
        return res.status(201).json(post);
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: error.message });
    }
};

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        return res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

export const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        return res.status(200).json(post);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

export const updatePost = async (req, res) => {
    try {
        if (!req.user._id) {
            return res.status(403).json({ message: 'You are not authorized to update this post' });
        }
        const existingPost = await Post.findById(req.params.id);
        if (!existingPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        if (existingPost.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You are not authorized to update this post' });
        }

        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(200).json(post);
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: error.message });
    }
};

export const deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        return res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};