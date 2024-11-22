import { saveToFile } from "./saveToFile.js";

export async function upload_video (url, model, fileManager) { 
  const uploadResponse = await fileManager.uploadFile(`${url}`, {
  mimeType: "video/mp4",
  displayName: "Product Video",
});

const result_video = await model.generateContent([
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

const temp = url.split('.')[1].split('/')[2];

saveToFile(`${temp}.txt`,result_video.response.text())
}