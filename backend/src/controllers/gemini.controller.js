import axios from "axios";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // Store your key securely
const GEMINI_API_URL = process.env.GEMINI_API_URL ||
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

export const analyzeWithGemini = async (req, res) => {
    const { account_name, title, caption, image_url } = req.body;
    if (!caption || !image_url) {
        return res.status(400).json({
            message: 'Please provide a caption and image URL.',
        });
    }
    try {
        const response = await axios.post( `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            contents: [{
                parts: [
                    {
                        text: `
                            Analyze the following social media content and convert it into an Amazon product listing.
                            Extract details, features, and benefits, and format it as optimized titles, bullet points, and descriptions for SEO:
                            "Account: ${account_name || ""}, Caption: ${ title || "" + caption || ""}, Image URL: ${image_url}"
                        `,
                    },
                ],
            }],
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        if (
            response.data.candidates &&
            response.data.candidates.length > 0
        ) {
            const amazonListing = response.data.candidates[0].content;
            // console.log('Generated Amazon Listing:\n', amazonListing);
            return amazonListing;
        } else {
            console.error('No candidates found in the response.');
            return null;
        }
    } catch (error) {
        console.error(
            'Error analyzing content with Gemini:',
            error.response ? error.response.data : error.message
        );
        throw error;
    }
}

// Example data for testing
// {
//     "account_name": 'Campus shoes',
//     "caption": 'Campus sports shoes',
//     "image_url": "https://imginn.com/p/DCOCuOhCJ98"
//     // "image_url": 'https://www.instagram.com/p/DCTJ9rkCRZQ/?igsh=cTN6OW9uajFtbzZw',
// };
