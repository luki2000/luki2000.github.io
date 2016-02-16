/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        /* We loop through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('checks if all URLs are defined and not empty',
            function() {
                for (var i = 0, len = allFeeds.length; i <
                    len; i++) {
                    expect(allFeeds[i].url).toBeTruthy();
                }
            });
        /* We loop through each feed in the allFeeds object and ensures
         *  it has a name defined and that the name is not empty.
         */
        it('checks if all names are defined and not empty',
            function() {
                for (var i = 0, len = allFeeds.length; i <
                    len; i++) {
                    expect(allFeeds[i].name).toBeTruthy();
                }
            });
    });
    /* Below is "The menu"where we want to test its hamburger functionality */
    describe('The menu', function() {
        /* We write a test that ensures the menu element is
         * hidden by default.
         */
        it(" is hidden by default", function() {
            expect('body').toHaveClass('menu-hidden');
        });
        /* We Write a test that ensures the menu changes
         * visibility when the menu icon is clicked.
         */
        it(
            " is visible when clicked and hidden when clicked again",
            function() {
                var body = $('body');
                //menu visible after clicking
                $('.menu-icon-link').trigger('click');
                expect(body).not.toContain(".menu-hidden");
                //menu hidden after clicking again
                $('.menu-icon-link').trigger('click');
                expect(body).toContain(".menu-hidden");
            });
    });
    /* We have our "Initial Entries" suite to test that we have our entries availables, we factor
    /* in that the function we use to load the data is asynchronous
     */
    describe('Initial Entries', function() {
        var feed = $('.feed');
        beforeEach(function(done) {
            loadFeed(0, done);
        });
        it(
            "should ensure that at least one entry is available after our loadFeed completes successfully",
            function() {
                /*Here we check for the first <a> child of the feed.
            /*Incidentally <a> is only generated/exist with its class "entry-link"
            /*if loadFeed yielded a successful result to ensure at least one feed entry is available
             */
                expect(feed.find("a.entry-link:first-child")).toExist();
            });
    });
    /* Here is our test suite named "New Feed Selection which tests that indeed we change our feed source
    through the menu"*/
    describe('New Feed Selection', function() {
        /* We grab the text of the h2 child of our feed, similar to the previous test.
         /* We do it for both the default feed entries and second feed entries, each with their own done() call backs
         /*  in their respectivebeforeEach calls.
         /* We then compare them in the test, and if the are different, we can be sure that the entries changed!
          */
        var feed = $('.feed');
        beforeEach(function(done) {
            loadFeed(0, function() {
                entries_before = $(feed).find(
                    "h2").text();
                done();
            });
        });
        beforeEach(function(done) {
            loadFeed(1, function() {
                entries_after = $(feed).find(
                    "h2").text();
                done();
            });
        });
        it(
            "should check if another feed is selected that the new entries is different",
            function() {
                expect(entries_before).not.toEqual(entries_after);
            });
    });
}());