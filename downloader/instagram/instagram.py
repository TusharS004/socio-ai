import os
import shutil

def download_using_instaloader(url):

    current_directory = os.getcwd()

    relative_path = os.path.join("..", "..", "socio-ai", "media", "instagram")
    # relative_path = os.path.join("..", "socio-ai", "media", "instagram")
    DOWNLOAD_PATH = os.path.join(current_directory, relative_path)

    target_dir = os.path.join(DOWNLOAD_PATH, url)

    if os.path.exists(target_dir):
        return -1
    
    os.mkdirs(target_dir)
    
    command = f"instaloader -- -{url}"
    os.system(command)

    source_file =  f'./-{url}'
    destination_file = target_dir

    shutil.move(source_file, destination_file)
