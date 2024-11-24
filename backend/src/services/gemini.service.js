import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleAIFileManager } from '@google/generative-ai/server';
import { generateWithImage } from '../utils/image.util.js';
import { generateWithVideo } from '../utils/video.util.js';

export const generateWithGemini = async (mediaPath) => {

    const API_KEY = process.env.GOOGLE_API_KEY;
    if(!API_KEY) {
        return null;
    }

    const fileManager = new GoogleAIFileManager(API_KEY);

    const genAI = new GoogleGenerativeAI(API_KEY);
    const image_model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
    });
    const video_model = genAI.getGenerativeModel({
        model: 'gemini-1.5-pro',
    });

    await mediaPath.forEach(({ url, public_id}) => {
        if (url.includes('.mp4')) {
            generateWithVideo(url, video_model, fileManager);
        } else if (url.includes('.jpg')) {
            generateWithImage(url, image_model, fileManager);
        }
    });

    // ek saath krne vala system

    // return ...
    // ...metadata
}
