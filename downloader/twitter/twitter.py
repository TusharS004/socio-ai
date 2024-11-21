import yt_dlp

DOWNLOAD_PATH = "./downloads/twitter/"
def download_tweet_media(url,shortcode):
    
    shortcode = url.split("/")[-1]
    caption = ""
    info: {""}
    print(shortcode)
    try:
        # Set up yt-dlp options
        ydl_opts = {
            'format': 'best',
            'outtmpl': f'downloads/twitter/x_{shortcode}.%(ext)s', 
            # Saves in the 'downloads' folder
            'quiet': False,  # Set to True for no output
        }
        # Run yt-dlp to download media
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([url])

        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            # Extract metadata for the tweet
            info = ydl.extract_info(url, download=False)

        print(info["title"])

        print("Download complete.")

    except Exception as e:
        print(f"An error occurred: {e}")
