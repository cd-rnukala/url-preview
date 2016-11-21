# url-preview
Objective: purpose of this project is given a url we should be able to display the page preview response.

# Logical Flow of the project
Directory structure is as follows:
<br> <b>css</b> (all styles)
<br> <b>img (all images)</b>
<br> <b>index.html</b>
<br> <b>js (linkPreview.js)</b>
<br> <b>php</b> 
    <br> <b>textCrawler.php (Master Router to initiate the crawling process)</b>, 
    <br> <b>Content.php (deals with get Content based on Image, Tag and meta information after scraping)</b>, 
    <br> <b>Json.php (Utility for the jsonizing data)</b>, 
    <br><b>LinkPreview.php (Crawling code starts from here which takes uses Media, Regex, Contet etc)</b>, 
    <br><b>Media.php</b>, 
    <br><b>Regex.php</b>, 
    <br><b>Setup.php</b>, 
    <br><b>Url.php</b>)

# Requirements to see it working:
<br>Apache2 server
<br>Copy the url-preview folder to /var/www/html folder or in MacOsx   (# /Library/WebServer/Documents/url-preview)
<br>Once the apache Server is up and running below is the url to access it. http://${host}/url-preview/index.html

# Test Cases tried out are:
<br> npr.com
<br> http://www.npr.com
<br> facebook.com
<br> airbnb.com or www.airbnb.com



