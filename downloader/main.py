# from downloader.instagram.instagram import download_using_instaloader
from instagram.instagram import download_using_instaloader
from twitter.twitter import download_tweet_media

def download_from_url(url):

    url = url[0:url.find('?')]

    if url.find('instagram.com') >= 0:
        type = 'instagram'
        if not url.endswith('/'):
            shortcode = url.split("/")[-1]
        else: 
            shortcode = url.split("/")[-2]
        return {"shortcode": shortcode, "type": type}


    elif url.find('x.com') >= 0:
        type = 'x'
        shortcode = url.split("/")[-1]  
          
        return {"shortcode": shortcode, "type": type}


if __name__ == "__main__":
    post_url = input()
    result = download_from_url(post_url)
    shortCode = result["shortcode"]
    type = result["type"]
    # print("shortcode", shortCode, "type", type)
    if type == 'instagram':
        result = download_using_instaloader(shortCode)
    elif type == 'x':
        result = download_tweet_media(post_url,shortCode)
        # result = download_tweet_media(shortCode)

    # print(result)

