const fetchInstagramDataWithMedia = async (url) => {
    console.log(`Hello inside fetchInstagramDataWithMedia ${url} Fetching Instagram data with media.`);
    const download_media = await fetch(process.env.FLASK_URL + "/api/url", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: url }),
    });
    console.log("after flask");
    
    if(!download_media) {
        console.error("Error fetching Instagram data.");
        return;
    }

    console.log(download_media);
    

    // const data = download_media.json();
    if (!data.message) {
        console.error("Error fetching Instagram data. ", data);
        return;
    }

    return data;
};

export default fetchInstagramDataWithMedia;