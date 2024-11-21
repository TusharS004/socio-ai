import Post from '../models/post.model.js';

export const createPost = async (req, res) => {
    try {
        const post = new Post(req.body);
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
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
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