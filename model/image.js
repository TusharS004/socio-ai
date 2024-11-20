import { GoogleAIFileManager } from "@google/generative-ai/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.GOOGLE_API_KEY;

const fileManager = new GoogleAIFileManager(API_KEY);
const mediaPath = './img/'; 
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const uploadResult = await fileManager.uploadFile(
  `${mediaPath}/speed.jpg`, 
  {
    mimeType: "image/jpeg",
    displayName: "Product Image",
  },
);

console.log(`Uploaded file ${uploadResult.file.displayName} as: ${uploadResult.file.uri}`);

const result = await model.generateContent([
  "Generate an Amazon product listing based on this image.",
  {
    fileData: {
      fileUri: uploadResult.file.uri,
      mimeType: uploadResult.file.mimeType,
    },
  },
]);

console.log(result.response.text());

const getResponse = await fileManager.getFile(uploadResult.file.name);

console.log(`Retrieved file ${getResponse.displayName} as ${getResponse.uri}`);