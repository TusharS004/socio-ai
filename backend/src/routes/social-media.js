import express from "express";
import SocialMediaPost from "../schema/SocialMediaPost.js";

const router = express.Router();

router.post("/social-media-posts", async (req, res) => {
  try {
    const { userId, content, username, platform } = req.body;
    
    if (!userId || !content || !username || !platform) {
      return res.status(400).json({ message: "All fields are not provided." });
    }
    
    const existingPost = await SocialMediaPost.findOne({ userId, content, username, platform });

    if (existingPost) {
      return res.status(400).json({ message: "Post already exists." });
    }
    
    const newPost = new SocialMediaPost({ userId, content, username, platform });
    const savedPost = await newPost.save();

    res.status(201).json({message: "Post created successfully", post: savedPost});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/social-media-posts", async (req, res) => {
  try {
    const posts = await SocialMediaPost.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/social-media-posts/:id", async (req, res) => {
  try {
    const post = await SocialMediaPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/social-media-posts/:id", async (req, res) => {
  try {
    const updatedPost = await SocialMediaPost.findByIdAndUpdate(
      req.params.id,
      req.body,
    );
    
    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    
    res.status(200).json({ message: "Post updated successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/social-media-posts/:id", async (req, res) => {
  try {
    const deletedPost = await SocialMediaPost.findByIdAndDelete(req.params.id);
    if (!deletedPost)
      return res.status(404).json({ message: "Post not found" });
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
