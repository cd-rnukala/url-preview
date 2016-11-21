# url-preview
Objective: purpose of this project is given a url we should be able to display the page preview response.

# Logical Flow of the project
Directory structure is as follows:
<br> css (all styles)
<br> img (all images)
<br> index.html
<br> js (linkPreview.js)
<br> php 
    <br> textCrawler.php (Master Router to initiate the crawling process), 
    <br> Content.php (deals with get Content based on Image, Tag and meta information after scraping), 
    <br> Json.php (Utility for the jsonizing data), 
    <br> LinkPreview.php (Crawling code starts from here which takes uses Media, Regex, Contet etc), 
    <br> Media.php, 
    <br> Regex.php, 
    <br> Setup.php, 
    <br> Url.php)

# Requirements to see it working:
<br>Apache2 server
<br>Copy the url-preview folder to /var/www/html folder or in MacOsx   (# /Library/WebServer/Documents/url-preview)
<br>Once the apache Server is up and running below is the url to access it. http://${host}/url-preview/index.html

# Test Cases tried out are:
<br> npr.com
<br> http://www.npr.com
<br> facebook.com
<br> airbnb.com or www.airbnb.com



