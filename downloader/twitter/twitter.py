import os
import yt_dlp

# DOWNLOAD_PATH = "./downloads/twitter/"  # Default download path

def download_tweet_media(url, shortcode):

    current_directory = os.getcwd()
    relative_path = f'..\socio-ai\media\{shortcode}'
    absolute_download_path = os.path.join(current_directory, relative_path)

    # print(absolute_download_path)

    try:
        # yt-dlp options
        ydl_opts = {
            'format': 'best',
            # 'outtmpl': os.path.join(absolute_download_path, f'x_{shortcode}.mp4'),
            'outtmpl': os.path.join(absolute_download_path, f'x_{shortcode}_%(autonumber)s.%(ext)s'),
            'quiet': False
        }

        # Download the media
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([url])

        print(f"Downloaded media saved to: {absolute_download_path}")

        return {"status": True, "message": "Download successful."}

    except yt_dlp.utils.DownloadError as e:
        return {"status": True, "message": "No video found."}
        # Handles No Video Error

    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return {"status": False, "error": e}
