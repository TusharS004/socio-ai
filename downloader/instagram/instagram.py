import os
import shutil

def download_using_instaloader(url):
    current_directory = os.getcwd()

    relative_path = os.path.join("..", "..", "socio-ai", "media", "instagram")
    DOWNLOAD_PATH = os.path.join(current_directory, relative_path)

    if os.path.exists(os.path.join(DOWNLOAD_PATH,f'-{url}')):
        return -1

    os.makedirs(DOWNLOAD_PATH, exist_ok=True)

    command = f"instaloader -- -{url}"
    os.system(command)

    source_file =  f'./-{url}'
    destination_file = DOWNLOAD_PATH

    shutil.move(source_file, destination_file)