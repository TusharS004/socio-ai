import fetchInstagramDataWithMedia from "../utils/Instagram.util.js";
import fetchTweetDataWithMedia from "../utils/twittor.util.js";


export const getTweet = async (url) => {
    try {
        const data = await fetchTweetDataWithMedia(url);
        return data;
    } catch (error) {
        console.error("Error fetching tweet data:", error);
        return res.status(500).json({ message: "Failed to fetch tweet data." });
    }
};

export const getInsta = async (url) => {
    try {
        const data = await fetchInstagramDataWithMedia(url);
        return data;
    } catch (error) {
        console.error("Error fetching tweet data:", error);
        return res.status(500).json({ message: "Failed to fetch tweet data." });
    }
};
