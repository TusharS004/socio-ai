import fs from 'fs';
import path from 'path';
import axios from 'axios';
import fetchInstagramDataWithMedia from '../utils/Instagram.util.js';
import { categorizeFiles } from '../utils/saveToFile.js';
import fetchTweetDataWithMedia from '../utils/twittor.util.js';
import { uploadToCloudinary } from '../utils/cloudinary.util.js';

export const getTweet = async (url, assetCwd) => {
    try {
        const shortCode = path.basename(url.toString());

        const data = await fetchTweetDataWithMedia(url);
        if (!data) return null;


        data.images = data.images?.length ? await Promise.all(
            data.images.map((image) =>
                uploadToCloudinary(image)
            ))
        : [];

        const videoData = await axios.post(
            `${process.env.FLASK_URL}/api/url`,
            { url }
        );

        if (
            !videoData.data ||
            videoData.data.message.toString().includes('No video')
        ) {
            return {
                ...data,
                videoData: undefined,
                videoLink: undefined,
            };
        } else {
            const uploadToCloud = await uploadToCloudinary(
                `${assetCwd}/x_${shortCode}.mp4`
            );
            if (!uploadToCloud) {
                return {
                    error: 'Error uploading video to cloudinary.',
                };
            }

            return {
                ...data,
                videos: uploadToCloud,
                videoData: undefined,
                videoLink: undefined,
            };
        }
    } catch (error) {
        console.error('Error fetching tweet data:', error);
        return null;
    }
};

export const getInsta = async (url, assetCwd) => {
    try {
        let data = await fetchInstagramDataWithMedia(url);
        if (!data) return null;

        data = await categorizeFiles(assetCwd);

        if (data.title && data.title[0]) {
            const titlePath = path.join(assetCwd, data.title[0]);
            data.title = fs.readFileSync(titlePath, 'utf8');
            fs.unlinkSync(titlePath); // Delete after reading
        } else {
            data.title = null;
        }

        data.images = (data.images?.length) ? await Promise.all( data.images.map((image) => {
            const imagePath = path.join(assetCwd, image);
                return uploadToCloudinary(imagePath);
            }))
        : [];

        data.videos = data.videos?.length ? await Promise.all(
            data.videos.map((video) => {
                const videoPath = path.join(assetCwd, video);
                return uploadToCloudinary(videoPath);
            }))
        : [];

        fs.rmdirSync(assetCwd, { recursive: true });

        return data;
    } catch (error) {
        console.error('Error fetching Insta data:', error);
        return null;
    }
};
