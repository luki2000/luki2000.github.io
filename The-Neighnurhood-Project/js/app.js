"use strict";
//Here we build the url link necessary
//to retrieve our JSON raw data from foursquare.
//Essentially we will use our data not only for our view list of locations
//but also for creating our markers
//To see how we actually retrieve our data via AJAX call look at the bottom of the AppViewModel
var prefix = 'https://api.foursquare.com/v2/venues/explore?';
var clientIS =
    'client_id=0OK4WGT3QAOMLPYMXOEWDDNM3LEYU415ZUDHZLOCJS1DPVMO&client_secret=WBJ1ARVOGQOA554NAVNMXHAIIJULGXKMIDR5AZNZ00MDWOOD';
var latLng = '&ll=47.36,08.55';
var limit = '&limit=50';
var defaultQuery = '&query=nearby';
var version = '&v=20160124';
var photo = '&venuePhotos=1';
var fullUrlString = prefix + clientIS + latLng + defaultQuery + limit + photo +
    version;
//Here we initiate variable that we will only need to create once, we aslo create
//our map positioning details, the map itself
var map;
var infowindow;

var zurich = {
    lat: 47.36,
    lng: 8.55
};
//The cuurentMarker will be used to control the animation between markers
//As we want to only animate one at a time, stopping the previously animated marker
//Once we move on to the next marker
var currentMarker = null;
//Collection of all our markers will be pushed into this array, useful for comparing the id value
//of markers vs their corresponding venue as their id will come from the venue id
var gmarkers = [];
//We initialise our google map here as well as our knockout binding to the viewmodel
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: zurich,
        zoom: 13,
        disableDefaultUI: true
    });
//infoWindow creation
    infowindow = new google.maps.InfoWindow({});

ko.applyBindings(new AppViewModel());
}

function googleError() {
    $("#map").prepend(
        "<h3 style='float:right; width:300px; color:red;z-index:0'><strong>We are sorry, the map cannot be rendered due to technical difficulties with Google map connection<strong></h3>"
    )
}

//our constructor Venue below is instantiated during our Ajax call
//passing on the data of each venue
//our google map logic also lives here as we need to use forsquares' data to make our markers
function Venue(data) {
    this.id = data.venue.id;
    this.name = data.venue.name;
    this.lat = data.venue.location.lat;
    this.lng = data.venue.location.lng;
    this.address = data.venue.location.formattedAddress;
    this.websiteUrl = data.venue.url;
    this.rating = data.venue.rating;
    this.ratingColor = "#" + data.venue.ratingColor;
    this.phoneNumber = data.venue.contact.formattedPhone;
    this.comment = data.tips[0].text;
    this.category = data.venue.categories[0].name;
    this.imgSrc = data.venue.photos.groups[0].items[0].prefix + '110x110' +
        data.venue.photos.groups[0].items[0].suffix;
    this.contentString = "<p style='font-weight:bold'>" + this.name +
        "</p>" + "<p>" + this.address + "</p>";
    //error handling if individual data
    if (!this.name) {
        this.name = "name is unavailable";
    }
    if (!this.address) {
        this.address = "no address details";
    }
    if (!this.websiteUrl) {
        this.websiteUrl = "website URL not available";
    }
    if (!this.rating) {
        this.rating = "N/A";
    }
    if (!this.phoneNumber) {
        this.phoneNumber = "No phone number available";
    }
    if (!this.comment) {
        this.comment = "N/A";
    }
    if (!this.imgSrc) {
        this.imgSrc = "No Image";
    }
    if (!this.category) {
        this.category = "N/A";
    }
    //All of below is our google map API logic we start by creating our markers, Since this part makes
    //use of the google object we need a conditional statement so as not to break the rest of the site
    //if the map object does not exist
    if (google) {
        var marker = new google.maps.Marker({
            position: {
                lat: this.lat,
                lng: this.lng
            },
            title: this.name,
            content: this.contentString,
            animation: google.maps.Animation.DROP,
            id: this.id,
            map: map,
            targetVenue: function() {
                //here we perform the necessary actions such as animating and zooming
                //to the marker and opening
                //the infowindow
                map.panTo(marker.position);
                infowindow.setContent(marker.content);
                infowindow.open(map, marker);
                if (marker.getAnimation() == null) {
                    //remove the bounce from old marker
                    if (currentMarker) {
                        currentMarker.setAnimation(null);
                    }
                    // set this marker to the currentMarker
                    currentMarker = marker;
                    marker.setAnimation(google.maps.Animation.BOUNCE);
                }
            }
        });
        //After creating our markers we push them to an array to be used later
        gmarkers.push(marker);
        //event listener to start bounce animation of marker
        marker.addListener('click', function() {
            if (marker.getAnimation() !== null) {
                // We actually leave this area empty to do nothing
                //this will keep the marker bouncing when the user is clicking the same venue over again from
                //our view list
            } else {
                //Make maker bounce!
                toggleBounce();
                //The id here is that of the DOM element of the venue li
                var currentVenueID = '#' + this.id;
                //Here we set the logic to highlight our selected venue on the view list when clicking the marker
                //Note we are first removing all siblings first so we don't have two
                //instances of highlighted venue
                $(currentVenueID).siblings().removeClass(
                    "highlightVenue");
                $(currentVenueID).toggleClass("highlightVenue");
                //Here we set the logic to scroll to the specific venue when we click on the marker
                var container = $(".viewListSection"),
                    scrollTo = $(currentVenueID);
                container.scrollTop(scrollTo.offset().top -
                    container.offset().top + container.scrollTop()
                );
            }
        });
        //Function to bounce marker
        function toggleBounce() {
                if (marker.getAnimation() !== null) {
                    marker.setAnimation(null);
                } else {
                    //remove the bounce from old marker
                    if (currentMarker) {
                        currentMarker.setAnimation(null);
                    }
                    // set this marker to the currentMarker
                    currentMarker = marker;
                    marker.setAnimation(google.maps.Animation.BOUNCE);
                }
            }
            //Adds infoWindow to marker
        marker.addListener('click', function() {
            infowindow.setContent(marker.content);
            infowindow.open(map, marker);
            //'Zero in' to marker's position that we are selecting
            map.panTo(marker.position);
        });
        //stop the bouncing animation after closing infoWindow
        infowindow.addListener('closeclick', function() {
            marker.setAnimation(null);
        });
    }
}

function AppViewModel() {
    var self = this;
    //Both variables below will be used for our search function
    //query is the user input, matchingString will be used to compare the users input against
    //the names of our venues to filter them
    self.query = ko.observable('');
    var matchingString = false;
    //Used for storing our venues data, we actually use it during our AJAX call
    //For more details check it out at the foot of the AppViewModel!
    self.venues = ko.observableArray();
    //this ko observable will keep track of the selected venue by storing the location id
    self.selectedVenue = ko.observable();
    //A function to set all our markers to be visible, used within the search function
    self.setAllMarkerVisibiltyOn = function() {
        for (var e in gmarkers) {
            gmarkers[e].setVisible(true);
        }
    };
    //targetMarker function allows us to target our marker when we select its
    //corrsponding location from the view list of locations
    self.targetMarker = function(venue) {
        //Our venue data is passed here through the parameter after clicking a venue from the
        //view list we can finally put our markers array to good use here
        //as we iterate through all our marker ids and see if its corresponds
        //to our venue.id of the selected venue
        for (var e in gmarkers) {
            if (venue.id === gmarkers[e].id) {
                //we reference the location by id and in the html we apply the css style to that
                //specific location thanks to it, this is for highlighting selected venue
                //after selecting from list view
                self.selectedVenue(venue.id);
                gmarkers[e].targetVenue();
            }
        }
    };
    //our search function will permit us to dynamically search for a venue through the
    //search input box.
    self.searchVenue = ko.computed(function() {
        //preset our search input to all lowercase for the filtering
        //logic
        var query = self.query().toLowerCase();
        if (!query) {
            //set all markers to be visible if search
            //input is empty
            self.setAllMarkerVisibiltyOn();
            return self.venues();
        } else {
            //Here we filter the search input by comparing
            //against our venue names
            return ko.utils.arrayFilter(self.venues(), function(
                item) {
                matchingString = item.name.toLowerCase().indexOf(
                    query) != -1;
                if (!matchingString) {
                    //during search mode we want to close all infoWindow
                    //this avoids an infoWindow from pointing to a filtered out
                    //marker
                    if (google) {
                        infowindow.close();
                    }
                    for (var e in gmarkers) {
                        //We also want to cancel out any Animation as we perform search
                        gmarkers[e].setAnimation(null);
                        //Here we iterate through our venues and identify those venues that are filtered
                        //out to set their corresponding markers to become invisible
                        if (item.id === gmarkers[e].id) {
                            gmarkers[e].setVisible(false);
                        }
                    }
                }
                return matchingString;
            });
        }
    });
    //load the JSON data of FourSquare
    $.getJSON(fullUrlString, function(allData) {
        //Here we grab our raw JSON data, convert it to array of objects
        //and run instances of our Venue model constructor passing on
        //the desired data
        var venues = allData.response.groups[0].items;
        var mappedVenues = $.map(venues, function(item) {
            return new Venue(item)
        });
        self.venues(mappedVenues);
    }).error(function(e) {
        $(".viewListSection").append(
            "<h1 style='color:red'>Currently venue information is unreachable. Refresh page or come back later!</h1>"
        );
    })
}