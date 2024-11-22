import { saveToFile } from "./saveToFile.js";

export async function upload_image (url, model, fileManager) {
  const uploadResult = await fileManager.uploadFile(
  `${url}`, 
  {
    mimeType: "image/jpeg",
    displayName: "Product Image",
  },
);

const result_image = await model.generateContent([
  "Generate an Amazon product listing based on this image.",
  {
    fileData: {
      fileUri: uploadResult.file.uri,
      mimeType: uploadResult.file.mimeType,
    },
  },
]);

const temp = url.split('.')[1].split('/')[2];

saveToFile(`${temp}.txt`,result_image.response.text() )
}