import { GoogleAIFileManager } from "@google/generative-ai/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { upload_image } from "./image.js";
import { upload_video } from "./video.js";

dotenv.config();

const API_KEY = 'AIzaSyCQl171VmSkUiFpn0TaF09JLNKLHubZTlA';
// const API_KEY = process.env.GOOGLE_API_KEY;

const fileManager = new GoogleAIFileManager(API_KEY);

const genAI = new GoogleGenerativeAI(API_KEY);
const image_model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const video_model = genAI.getGenerativeModel({model: "gemini-1.5-pro"});

// Media Path from Download
const mediaPath = [
    'https://res.cloudinary.com/diutjor80/image/upload/v1732229952/Socio-AI/sqiu03lnmi8c6wsnqbcf.jpg',
    // 'https://res.cloudinary.com/diutjor80/video/upload/v1719990872/Youtube-ChaiAurCode-Backend/m1dh1tp4o4ju60eu8egr.mp4',
    // 'https://res.cloudinary.com/diutjor80/video/upload/v1719990756/Youtube-ChaiAurCode-Backend/resierqa72lpxijsn8lz.mp4',
    'https://res.cloudinary.com/diutjor80/video/upload/v1732351693/Socio-AI/15_seconds_of_nature_oq8ylg.mp4',
];


mediaPath.forEach(element => {
    if (element.includes('.mp4')) {
        upload_video(element, video_model, fileManager)
    }
    else if (element.includes('.jpg')) {
        upload_image(element, image_model, fileManager)
    }
});