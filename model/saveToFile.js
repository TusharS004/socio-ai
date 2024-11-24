import fs from 'fs';
export function saveToFile(filename, data) {
    fs.writeFile(filename, data, (err) => {
        if (err) {
            console.error(`Error writing to file: ${err}`);
        } else {
            console.log(`Data saved successfully to ${filename}`);
        }
    });
}
