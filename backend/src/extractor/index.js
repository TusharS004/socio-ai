import { GoogleAIFileManager } from "@google/generative-ai/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { upload_image } from "./image.js";
import { upload_video } from "./video.js";
import fs from "fs"
import path from "path"
import { dir, log } from "console";


export function extract_index(mediaPath) {
    
    // dotenv.config();

    const API_KEY = process.env.GOOGLE_API_KEY;

    const fileManager = new GoogleAIFileManager(API_KEY);

    const genAI = new GoogleGenerativeAI(API_KEY);
    const image_model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const video_model = genAI.getGenerativeModel({model: "gemini-1.5-pro"});

    const __dirname = process.cwd()

    const directoryPath = path.join(__dirname, mediaPath);
    
    let index = 1;
    // Read the directory
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return console.error('Unable to scan directory:', err);
        }
        
        // Loop through all the files
        files.forEach(element => {
            if (element.includes('.mp4')) {
                upload_video(mediaPath, element, video_model, fileManager,index++)
            }
            else if (element.includes('.jpg')) {
                upload_image(mediaPath, element, image_model, fileManager,index++)
            }
        });
    });
}


