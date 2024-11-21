import { handleImage, handleVideo } from "./utils.js";

async function getResults(url) {
    if (url.includes('.mp4')) {
        console.log("Video");
        return await handleVideo('./media/ponds.mp4');
    }
    else {
        console.log("Image");
        return await handleImage('./media/ponds.jpg');
    }
}

console.log(await getResults("./media/ponds.png"));