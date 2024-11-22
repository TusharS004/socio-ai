import os
import yt_dlp

# DOWNLOAD_PATH = "./downloads/twitter/"  # Default download path

def download_tweet_media(url,shortcode):
    current_directory = os.getcwd()
    
    relative_path = f'..\socio-ai\media\{shortcode}/' 

    absolute_download_path = os.path.join(current_directory, relative_path)

    print(absolute_download_path)

    try:
        # yt-dlp options
        ydl_opts = {
            'format': 'best',
            'outtmpl': os.path.join(absolute_download_path, f'x_{shortcode}.%(ext)s'), 
            'quiet': False,  # Set to True to suppress output
        }

        print(ydl_opts)

    #     # Extract metadata first
        # with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        #     info = ydl.extract_info(url, download=False)
        #     print(f"Tweet Title: {info.get('title', 'No Title Available')}")

        # Download the media
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([url])

        print("Download complete.")

    except yt_dlp.utils.DownloadError as e:
        print(f"Download error: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
