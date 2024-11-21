import { GoogleAIFileManager } from '@google/generative-ai/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from 'dotenv';

config();

const API_KEY = process.env.GOOGLE_API_KEY;
if(!API_KEY) {
    throw new Error('API key is required');
}

const fileManager = new GoogleAIFileManager(API_KEY);
const genAI = new GoogleGenerativeAI(API_KEY);

export async function handleImage(file_url) {
    const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
    });
    const uploadResult = await fileManager.uploadFile(file_url, {
        mimeType: 'image/jpeg',
        displayName: 'Product Image',
    });

    const result = await model.generateContent([
        'Generate an Amazon product listing based on this image.',
        {
            fileData: {
                fileUri: uploadResult.file.uri,
                mimeType: uploadResult.file.mimeType,
            },
        },
    ]);

    return result.response.text();
}

export async function handleVideo(file_url) {
    const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-pro',
    });
    const uploadResponse = await fileManager.uploadFile(file_url, {
        mimeType: 'video/mp4',
        displayName: 'Product ' + 'Video',
    });

    const result = await model.generateContent([
        {
            fileData: {
                mimeType: uploadResponse.file.mimeType,
                fileUri: uploadResponse.file.uri,
            },
        },
        {
            text: 'Generate an Amazon product listing based on this video.',
        },
    ]);

    return result.response.text();
}