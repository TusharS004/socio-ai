// Importing required modules
import https from 'https';
import fs from 'fs';

// Function to download an image from a given URL
export function downloadImage(url, filepath) {
    const file = fs.createWriteStream(filepath);

    https.get(url, (response) => {
        // Check if the response status is OK (200)
        if (response.statusCode === 200) {
            response.pipe(file);
            file.on('finish', () => {
                file.close();
            });
        } else {
            console.error(`Failed to get image: ${response.statusCode}`);
        }
    }).on('error', (err) => {
        fs.unlinkSync(filepath); // Delete the file if there's an error
        console.error(`Error downloading image: ${err.message}`);
    });
}