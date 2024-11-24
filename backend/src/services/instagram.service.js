const fetchInstagramDataWithMedia = async (url) => {
    console.log("Fetching Instagram data with media.");
    const download_media = await fetch(process.env.FLASK_URL + "/api/url", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: url }),
    });

    if(!download_media) {
        console.error("Error fetching Instagram data.");
        return;
    }

    const data = await download_media.json();
    if (!data.message) {
        console.error("Error fetching Instagram data. ", data);
        return;
    }

    return data;
};

export default fetchInstagramDataWithMedia;