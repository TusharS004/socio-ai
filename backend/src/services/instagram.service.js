// const fetchInstagramDataWithMedia = async (url) => {
//     console.log(`Hello inside fetchInstagramDataWithMedia ${url} Fetching Instagram data with media.`);
//     const download_media = await fetch(process.env.FLASK_URL + "/api/url", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ url: url }),
//     });
//     console.log("after flask");
    
//     if(!download_media) {
//         console.error("Error fetching Instagram data.");
//         return;
//     }

//     console.log(download_media);
//     const data = download_media;
//     console.log(download_media.json());
    

//     // const data = download_media.json();
//     if (!data.message) {
//         console.error("Error fetching Instagram data. ", data);
//         return;
//     }

//     return data;
// };

// export default fetchInstagramDataWithMedia;

const fetchInstagramDataWithMedia = async (url) => {
    console.log(`\n\n\nHello inside fetchInstagramDataWithMedia \n\n${url}\n\n Fetching Instagram data with media.\n\n\n`);
    try {
        const response = await fetch(`${process.env.FLASK_URL}/api/url`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ url: url }),
        });
        console.log("\n\nafter flask\n\n");

        // Ensure the response is okay
        if (!response.ok) {
            console.error("Error fetching Instagram data. HTTP Status:", response.status);
            return { error: "Failed to fetch Instagram data." };
        }

        // Parse the JSON response
        const data = await response.json();
        console.log("API Response Data:", data);

        // Check if the response contains an error
        if (data.error) {
            console.error("Error from Flask API:", data.error);
            return { error: data.error };
        }

        return data;

    } catch (error) {
        console.error("Error fetching Instagram data:", error);
        return { error: "An unexpected error occurred while fetching data." };
    }
};

export default fetchInstagramDataWithMedia;
