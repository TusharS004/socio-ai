import { GoogleAIFileManager } from "@google/generative-ai/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { upload_image } from "./image.js";
import { upload_video } from "./video.js";

dotenv.config();

const API_KEY = process.env.GOOGLE_API_KEY;

const fileManager = new GoogleAIFileManager(API_KEY);

const genAI = new GoogleGenerativeAI(API_KEY);
const image_model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const video_model = genAI.getGenerativeModel({model: "gemini-1.5-pro"});

// Media Path from Download 
const mediaPath = [
    "./media/nike.jpg",
    "./media/puma.mp4"
];

mediaPath.forEach(element => {
    if (element.includes('.mp4')) {
        upload_video(element, video_model, fileManager)
    } 
    else if (element.includes('.jpg')) {
        upload_image(element, image_model, fileManager)
    }
});



