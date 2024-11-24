import { saveToFile } from './saveToFile.util.js';
import fs from 'fs';
import path from 'path';
import axios from 'axios';

export async function generateWithImage(url, model, fileManager) {
    const temp = path.basename(url);

    if (
        fs.existsSync(`${temp.slice(0, temp.lastIndexOf('.'))}.txt`)
    ) {
        // saveToFile(`${temp}.txt`, 'Video');
        console.log('File already exists');
        return;
    }

    if (!url.startsWith('http')) {
        console.error('wrong url');
        return;
    }

    const response = await axios.get(url, {
        responseType: 'arraybuffer',
    });

    // Step 2: Save the file temporarily
    const tempFileName = `temp_${temp}`;
    const tempFilePath = path.join('../temp', tempFileName);
    fs.mkdirSync('../temp', { recursive: true });
    fs.writeFileSync(tempFilePath, response.data);

    const uploadResult = await fileManager.uploadFile(tempFilePath, {
        mimeType: 'image/jpeg',
        displayName: 'Product Image',
    });

    const result_image = await model.generateContent([
        'Generate an Amazon product listing based on this image.',
        {
            fileData: {
                fileUri: uploadResult.file.uri,
                mimeType: uploadResult.file.mimeType,
            },
        },
    ]);

    fs.unlinkSync(tempFilePath);

    saveToFile(
        `../temp/${temp.slice(0, temp.lastIndexOf('.'))}.txt`,
        result_image.response.text()
    );
}
