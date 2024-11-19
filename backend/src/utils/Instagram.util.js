import puppeteer from "puppeteer";

const fetchInstagramDataWithMedia = async (url) => {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    try {
        await page.goto(url, { waitUntil: 'networkidle2' });

        const openGraphData = await page.evaluate(() => {
            return {
                title:
                    document.querySelector('meta[property="og:title"]')?.content || null,
                image:
                    document.querySelector('meta[property="og:image"]')?.content || null,
                description:
                    document.querySelector('meta[property="og:description"]')?.content || null,
            };
        });

        return { ...openGraphData };
    } catch (error) {
        console.error('Error scraping Instagram post:', error);
        return null;
    } finally {
        await browser.close();
    }
};

export default fetchInstagramDataWithMedia;
