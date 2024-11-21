import { handleImage, handleVideo } from "./utils.js";

async function getResults(url) {
    if (url.includes('.mp4')) {
        console.log("Video");
        return await handleVideo(url);
    }
    else {
        console.log("Image");
        return await handleImage(url);
    }
}

console.log(await getResults("./media/ponds.mp4"));