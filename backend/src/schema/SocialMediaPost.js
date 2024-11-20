import mongoose from "mongoose";

const SocialMediaPostSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  content: { type: String, required: true },
  username: { type: String, required: true },
  platform: { type: String, required: true },
  imageUrl: { type: String }, 
},{ timestamps: true });

const SocialMediaPost = mongoose.model(
  "SocialMediaPost",
  SocialMediaPostSchema
);

export default SocialMediaPost;
