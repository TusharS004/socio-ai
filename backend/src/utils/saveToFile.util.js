// import fs from 'fs';
// import path from 'path';

// export async function saveToFile(filename, data) {
//     fs.writeFile(filename, data, (err) => {
//         if (err) {
//             console.error(`Error writing to file: ${err}`);
//         } else {
//             console.log(`Data saved successfully to ${filename}`);
//         }
//     });
// }

// export async function categorizeFiles(folderPath) {
//     const categorizedFiles = {
//         content: [], // Correctly handling text files
//         images: [],
//         videos: [],
//     };


//     console.log("inside before" + folderPath);
//     const items = fs.readdirSync(path.resolve(folderPath));
//     console.log("after" + items);
//     items.forEach((item) => {
//         const itemPath = path.join(folderPath, item);
//         const stat = fs.statSync(itemPath);

//         // Check if it's a file and categorize based on extension
//         if (stat.isFile()) {
//             const ext = path.extname(item).toLowerCase();

//             if (ext === '.txt') {
//                 categorizedFiles.content.push(item);
//             } else if (ext === '.jpg') {
//                 categorizedFiles.images.push(item);
//             } else if (ext === '.mp4') {
//                 categorizedFiles.videos.push(item);
//             }
//         }
//     });

//     return categorizedFiles;
// }
import fs from 'fs/promises';
import path from 'path';

export async function saveToFile(filename, data) {
    try {
        await fs.writeFile(filename, data);
        console.log(`Data saved successfully to ${filename}`);
    } catch (err) {
        console.error(`Error writing to file: ${err.message}`);
    }
}

export async function categorizeFiles(folderPath) {
    const categorizedFiles = {
        content: [], // Correctly handling text files
        images: [],
        videos: [],
    };

    try {
        console.log("inside before " + folderPath);
        const items = await fs.readdir(path.resolve(folderPath));
        console.log("after " + items);

        for (const item of items) {
            const itemPath = path.join(folderPath, item);
            const stat = await fs.stat(itemPath);

            // Check if it's a file and categorize based on extension
            if (stat.isFile()) {
                const ext = path.extname(item).toLowerCase();

                if (ext === '.txt') {
                    categorizedFiles.content.push(item);
                } else if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
                    categorizedFiles.images.push(item);
                } else if (ext === '.mp4') {
                    categorizedFiles.videos.push(item);
                }
            }
        }
    } catch (error) {
        console.error(`Error reading folder ${folderPath}: ${error.message}`);
    }

    return categorizedFiles;
}