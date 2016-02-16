WELCOME TO THE NEIGHBOURHOOD PROJECT!

This project was build to provide information on locations near
my home in Zurich. 


How to Start the App

1. To start running the application open the index.html file with your preferred
browser. You can use a computer or mobile dev tools device to simulate a mobile device.

2. The google map api will automatically launch the google map into full screen view. A foursquare
Api will populate information of locations that will prompt the
generation of google map markers and a list view of the venues
will appear on the menu on the left hand side.


How to interact with the Api  

There are 3 main functions to this application:

//////////////////////////////////////////////////////////////////////////////
1. Search a venue

i. An input box is provided on the menu which will allow you to search the venues by name, as you search you should see
the venues starting to filter out from the view list below if they don't match the search. 

ii. Markers are associated with the venues, so only matched search results will have their markers visible. All this happens 
dynamically without the need of clicking a submit button or
pressing enter. 

iii. You can start over your search simply by deleting your input by pressing backspace all the way or reverting to a point where
you had results as you delete each character.

////////////////////////////////////////////////////////////////////////////
2. Click a venue from the view list.

i. When you click any of the venues on the view list. It will prompt it's corresponding marker to animate. The application will
center to the location as well. Notice that information provided on the viewlist is more detailed than the info box that appears above the marker.

///////////////////////////////////////////////////////////////////////////
3. Click a marker

i. Clicking a marker directly will make it animate and give small info on that venue. It will also make the app scroll to the corresponding venue 
on the view list and highlight it.



What happens if one of the APIs don't work

Hopefully the application can always reach the intended data, but in case the google map api is unavailable, you should still be able to see a list of venues
and search through their names. If on the other hand the foursquare Api is not working but the Google Api is reachable, You will get a message that the venue information is unavailable. 
Since the markers are dependent on the foursquare Data you will only see the map and not the markers. In either cases contact our support team to rectify the problem at
IT-Support@neighbourhood.com


  