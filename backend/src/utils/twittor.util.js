import puppeteer from 'puppeteer';

const fetchTweetDataWithMedia = async (url) => {
    const browser = await puppeteer.launch({
        headless: true, // Set to 'false' to see the browser in action for debugging
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();

    try {
        // Navigate to the tweet URL
        await page.goto(url, { waitUntil: 'networkidle2' });

        // Wait for the main tweet content to load
        await page.waitForSelector('article');

        // Extract tweet content including text, images, and videos
        const tweetData = await page.evaluate(() => {
            // Get the main text of the tweet
            const caption =
                document.querySelector('div[data-testid="tweetText"]')
                    ?.innerText || 'No text found';

            // Extract all image URLs
            const images = Array.from(
                document.querySelectorAll('img')
            )
                .map((img) => img.src)
                .filter((src) => src.includes('media'));

            return { caption, images };
        });

        const username = url.toString().split('/')[3];
        const video = url.toString().replace(username, 'i');
        // console.log(video);

        console.log('Tweet Data:', {
            ...tweetData,
            videoLink: video,
            username,
        });
    } catch (error) {
        console.error('Error fetching tweet data:', error);
    } finally {
        // Close the browser
        await browser.close();
    }
};

export default fetchTweetDataWithMedia;