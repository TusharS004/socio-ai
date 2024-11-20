import { GoogleAIFileManager } from "@google/generative-ai/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.GOOGLE_API_KEY;

const fileManager = new GoogleAIFileManager(API_KEY);

const uploadResponse = await fileManager.uploadFile("./vid/ponds.mp4", {
  mimeType: "video/mp4",
  displayName: "Product Video",
});


const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
});

const result = await model.generateContent([
  {
    fileData: {
      mimeType: uploadResponse.file.mimeType,
      fileUri: uploadResponse.file.uri,
    },
  },
  {
    text: "Generate an Amazon product listing based on this video.",
  },
]);

console.log(result.response.text());