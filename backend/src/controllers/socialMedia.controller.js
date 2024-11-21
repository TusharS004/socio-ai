import fetchInstagramDataWithMedia from "../utils/Instagram.util.js";
import fetchTweetDataWithMedia from "../utils/twittor.util.js";
import {downloadImage} from "./twitterImages.controller.js";

export const getTweet = async (req, res, next) => {
    try {
        const data = await fetchTweetDataWithMedia(req.body.url);
        if(!data || !data?.caption) {
            return res.status(404).json({ message: "No tweet data found." });
        }

        const image_url = data.images;
        let count = 1;
        
        image_url.forEach((url) => {
            downloadImage(url,`images${count}.jpg`);
            count++;
        });
        return res.status(200).json(data);

    } catch (error) {
        console.error("Error fetching tweet data:", error);
        return res.status(500).json({ message: "Failed to fetch tweet data." });
    }
};

export const getInstagramPost = async (req, res, next) => {
    try {
        // let url = req.body.url.toString().trim().replace("instagram", "imginn");
        // url = url.split('?')[0];
        const data = await fetchInstagramDataWithMedia(req.body.url);

        if(!data || !data.title) {
            return res.status(404).json({ message: "No Instagram post data found." });
        }
        return res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching Instagram post data:", error);
        return res.status(500).json({ message: "Failed to fetch Instagram post data." });
    }
}