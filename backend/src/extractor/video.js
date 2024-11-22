import { saveToFile } from "./saveToFile.js";

export async function upload_video (mediaPath, url, model, fileManager,index) { 
  const uploadResponse = await fileManager.uploadFile(`${mediaPath}/${url}`, {
  mimeType: "video/mp4",
  displayName: "Product Video",
});
// Limit 16 Seconds
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

const temp = mediaPath.split('/')[3];

saveToFile(`${temp}Vid${index}.txt`,result_video.response.text())
}