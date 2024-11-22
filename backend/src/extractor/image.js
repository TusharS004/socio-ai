import { saveToFile } from "./saveToFile.js";

export async function upload_image (mediaPath, url, model, fileManager, index) {

const uploadResult = await fileManager.uploadFile(
  `${mediaPath}/${url}`, 
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

const temp = mediaPath.split('/')[3];

saveToFile(`${temp}Img${index}.txt`,result_image.response.text() )
}