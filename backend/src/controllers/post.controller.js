import Post from '../models/post.model.js';

export const createPost = async (req, res) => {
    if (!req?.user?._id)
        return res.status(403).json({ message: 'You are not authorized to create this post' });

    try {
        const { content, url } = req.body;
        if(!content)
            return res.status(400).json({ message: 'Content is required' });

        const post = new Post({
            content,
            url,
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