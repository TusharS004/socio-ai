import path from 'path';
import { getInsta, getTweet } from "../utils/socialMedia.util.js";

export const getPost = async (req, res, next) => {
    const urlString = req.body.url;

    try {
        const url = new URL(
            urlString.includes('?')
                ? urlString.substring(0, urlString.indexOf('?'))
                : urlString
        );

        const shortCode = path.basename(url.toString());
        const assetCwd = path.join(
            process.cwd(),
            `../media/${shortCode}`
        );

        let data;
        if (url.hostname.includes('instagram.com')) {
            data = await getInsta(url, assetCwd);
        } else if (url.hostname.includes('x.com') || url.hostname.includes('twitter.com')) {
            data = await getTweet(url, assetCwd);
        } else {
            return res.status(400).json({
                source: 'unknown',
                message: 'The URL is not from Twitter or Instagram.',
            });
        }

        if (!data) {
            return res.status(400).json({
                message: 'No data found.',
            });
        }
        return res.status(200).json(data);
    } catch (error) {
        console.error('Error in getPost:', error.message);
        return res.status(400).json({
            source: 'error',
            message: 'Invalid URL provided.',
        });
    }
};
