import puppeteer from 'puppeteer';

const fetchTweetDataWithMedia = async (url) => {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        timeout: 60000,
    });


    const page = await browser.newPage();

    try {
        await page.goto(url, { waitUntil: 'networkidle2' });
        await page.waitForSelector('article');

        const tweetData = await page.evaluate(() => {
            // const getInnerText = (selector) =>
            //     document.querySelector(selector)?.innerText || 'N/A';

            const caption =
                document.querySelector('div[data-testid="tweetText"]')
                    ?.innerText || 'No text found';

            const images = Array.from(
                document.querySelectorAll('img')
            )
                .map((img) => img.src)
                .filter((src) => src.includes('media'));

            // Timestamp
            const timestamp =
                document
                    .querySelector('time')
                    ?.getAttribute('datetime') || 'N/A';

            return {
                caption,
                images,
                timestamp,
            };
        });

        const username = url.split('/')[3];
        const videoLink = url.replace(username, 'i');

        const data = {
            ...tweetData,
            videoLink,
            username,
        };

        return data;
    } catch (error) {
        console.error('Error fetching tweet data:', error);
    } finally {
        await browser.close();
    }
};

export default fetchTweetDataWithMedia;
