from instagram.instagram import download_using_instaloader
from twitter.twitter import download_tweet_media

def download_from_url(url):
    url = url[0:url.find('?')] if '?' in url else url 
    shortcode = ""
    if url.find('instagram.com') >= 0:
        type = 'instagram'
        if not url.endswith('/'):
            shortcode = url.split("/")[-1]
        else: 
            shortcode = url.split("/")[-2]
        download_using_instaloader(shortcode)
        return {"shortcode": shortcode, "type": type}


    elif url.find('x.com') >= 0:
        type = 'x'
        shortcode = url.split('/')[-1]
        download_tweet_media(url,shortcode)
        return {"shortcode": shortcode, "type": type}


