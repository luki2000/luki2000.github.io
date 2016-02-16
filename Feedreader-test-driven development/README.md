# <h1>Feeder Reader</h1>

## <h2>For Users' and developers' eyes</h2>

    <p>Welcome to UdaciFeeds! Here you will find numerous feeds from various sources such as UdacityBlog, CSS Tricks, HTML5 Rocks and Linear Digressions.</p>

### <h3>How to get started</h3>

    <p>Launch the site by opening the index.html with the browser of your choice. Automatically the entries will be load underneath the top green bar on the page. They correspond to the feed name that you see on the green bar at the top next to the hamburger icon. Click on any entry's title that you are interested in. It will take you to the site and page of the full article. If you are interested in another feed, simply click the hamburger icon on the very top left of the page. This will open the menu which will display a list of feeds aformentioned. Clicking one of them wil launch it's corresponding entries for you to marvel at.</p>


## <h2>For developers' eyes only</h2>

### <h3>Test Plan</h3>

    <p>At the bottom of the page you will see a specification-like list. It is generated HTML that uses the jasmine plug-in to test the features of the site. You can have a closer look at the test by visiting the script feedreader.js located in jasmine/spec/feedreader.js. This plugin is great to ensure future development on the site would not break the existing tested features of the site. Feel, free to improveon the site with no hand-breaks or even add more test scenarios. Learn more about jasmine through their documentation at http://jasmine.github.io/2.1/introduction.html. Jasmine does not naturally work with jQuery has intuitively as you see in the code feedreader.js, you would require the jasmine/jQuery plug-in as well to compensate for that (already included at js/helpers/jquery-jasmine.js), for more info visit https://github.com/velesin/jasmine-jquery.</p>

