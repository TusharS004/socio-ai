import os
import shutil

DOWNLOAD_PATH = "./downloads/instagram/"  # Define the target directory to move content to

def download_using_instaloader(url):
    # Checking if the Download already exists
    check_path = f"{DOWNLOAD_PATH}-{url}"
    if os.path.exists(f"{check_path}"):
        print(f"It already Exits. Check {check_path}")
        return
    
    # Ensure the target directory exists
    if not os.path.exists(DOWNLOAD_PATH):
        os.makedirs(DOWNLOAD_PATH)

    # Run the instaloader command to download the post into the temporary path
    command = f"instaloader -- -{url}"
    os.system(command)

    # Define the temporary download path based on the URL
    TEMP_DOWNLOAD_PATH = f"-{url}"
    print(f"Temporary download path: {TEMP_DOWNLOAD_PATH}")
    
    if os.path.exists(TEMP_DOWNLOAD_PATH):
        # Create a new directory in the desired path
        new_temp_path = os.path.join(DOWNLOAD_PATH, TEMP_DOWNLOAD_PATH)
        os.makedirs(new_temp_path, exist_ok=True)

        # Move files from TEMP_DOWNLOAD_PATH to DOWNLOAD_PATH
        for filename in os.listdir(TEMP_DOWNLOAD_PATH):
            source_file = os.path.join(TEMP_DOWNLOAD_PATH, filename)
            destination_file = os.path.join(new_temp_path, filename)
            shutil.move(source_file, destination_file)

        # Remove the temporary download folder and all its contents
        try:
            shutil.rmtree(TEMP_DOWNLOAD_PATH)  # This will remove the directory and all its contents
        except Exception as e:
            print(f"Error removing {TEMP_DOWNLOAD_PATH}: {e}")

    print("Download and move complete.")
