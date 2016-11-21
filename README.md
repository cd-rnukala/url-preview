# url-preview
Objective: purpose of this project is given a url we should be able to display the page preview response.

# Logical Flow of the project
Directory structure is as follows:
 a) css (all styles)
 b) img (all images)
 c) index.html
 d) js (linkPreview.js)
 e) php 
    i) textCrawler.php (Master Router to initiate the crawling process), 
    ii) Content.php (deals with get Content based on Image, Tag and meta information after scraping), 
    iii) Json.php (Utility for the jsonizing data), 
    iv) LinkPreview.php (Crawling code starts from here which takes uses Media, Regex, Contet etc), 
    v) Media.php, 
    vi) Regex.php, 
    vii) Setup.php, 
    viii) Url.php)

# Requirements to see it working:
a) Apache2 server
b) Copy the url-preview folder to /var/www/html folder or in MacOsx   (# /Library/WebServer/Documents/url-preview)
Once the apache Server is up and running below is the url to access it.
http://${host}/url-preview/index.html

# Test Cases tried out are:
a) npr.com
b) http://www.npr.com
c) facebook.com
d) airbnb.com or www.airbnb.com



