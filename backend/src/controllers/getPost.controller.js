import path from 'path';
import { getInsta, getTweet } from "./socialMedia.controller.js";

export const getPost = async (req, res, next) => {
    const urlString = req.body.url;

    try {
        const url = new URL(urlString.includes('?') ? urlString.substring(0, urlString.indexOf('?')) : urlString);

        // Check for Instagram
        if (url.hostname.includes('instagram.com')) {
            const shortcode = url.pathname.endsWith('/')
            ? url.pathname.split('/').slice(-2, -1)[0]
            : url.pathname.split('/').pop();

            const data = await getInsta(url)
            // From Flask
            const response = await axios.post(`${process.env.FLASK_URL}/api/url`, {
                url
            });

            if(!data || !data.title) {
                return res.status(404).json({ message: "No Instagram post data found." });
            }
            return res.status(200).json(data);
        }

        // Check for Twitter (formerly known as X)
        if (url.hostname.includes('x.com') || url.hostname.includes('twitter.com')) {
            const tweetId = url.pathname.split('/').pop(); // Extract tweet ID
            const data = await getTweet(url);
            if(!data || !data?.caption) {
                return res.status(404).json({ message: "No tweet data found." });
            }

            console.log(process.cwd());
            fs.mkdir(`/media/${tweetId}`, () => {
                console.log("directory created");

            })

            const download_path = path.join(process.cwd(), `..\\media\\${tweetId}`);

            fs.mkdir(download_path, { recursive: true }, (err) => {
                if (err) {
                    console.error('Error creating directory:', err);
                    return res.status(500).json({ message: 'Failed to create directory.' });
                }
                console.log('Directory created successfully!')
            }
        );

            const image_url = data.images;

            let downloadPromises = image_url.map((imgUrl, index) => {
                return downloadImage(imgUrl, path.join(download_path, `image${index + 1}.jpg`));
            });

            const videoData= await axios.post(`${process.env.FLASK_URL}/api/url`, {
                url
            });

            // Wait for all downloads to complete
            Promise.all(downloadPromises)
                .then(() => {
                    return res.status(200).json(data);
                })
                .catch((downloadError) => {
                    console.error('Error downloading images:', downloadError);
                    return res.status(500).json({ message: 'Failed to download images.' });
                });

            return; // Prevents sending a response immediately before downloads finish
            }

            // If the URL doesn't match either service
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
