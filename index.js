const axios = require("axios");
const GEMINI_API_KEY = "AIzaSyCQl171VmSkUiFpn0TaF09JLNKLHubZTlA"; // Store your key securely
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

// Function to analyze content with Gemini 1.5 Flash API
async function analyzeWithGemini(content) {
    try {
        const response = await axios.post(
            `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
            {
                contents: [
                    {
                        parts: [
                            {
                                text: `
                                    Analyze the following social media content and convert it into an Amazon product listing.
                                    Extract details, features, and benefits, and format it as optimized titles, bullet points, and descriptions for SEO:
                                     "Account: ${content.account_name}, Caption: ${content.caption}, Image URL: ${content.image_url}"
                                `
                            }
                        ]
                    }
                ]
                // ,
                // temperature : 0.7 ,   "Account: ${content.account_name}, Caption: ${content.caption},
                // top_p : 0.9,
                // top_k : 50,
                // max_output_tokens : 150,
                // candidates : 3
            },

            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        
        // Extract Amazon listing from the response
        if (response.data.candidates && response.data.candidates.length > 0) {
            const amazonListing = response.data.candidates[0].content; // Accessing the correct field
            console.log("Generated Amazon Listing:\n", amazonListing);
            return amazonListing;
        } else {
            console.error("No candidates found in the response.");
            return null;
        }
    } catch (error) {
        console.error("Error analyzing content with Gemini:", error.response ? error.response.data : error.message);
        throw error;
    }
}

// Function to fetch and process social media content
async function processSocialMediaPost(data) {
    try {
        if (data) {
            await analyzeWithGemini(data);
        }
    } catch (error) {
        console.error("Failed to process social media post:", error.message);
    }
}

// Example data for testing
const data = {
    account_name: "Campus shoes",
    caption: "Campus sports shoes",
    // image_url: "https://imginn.com/p/DCOCuOhCJ98"
    image_url: "https://www.instagram.com/p/DCTJ9rkCRZQ/?igsh=cTN6OW9uajFtbzZw"

};

processSocialMediaPost(data);
