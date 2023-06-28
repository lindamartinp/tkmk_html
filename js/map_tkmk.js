var map;
var directionsService;
var directionsRenderer;
var marker1;
var marker2;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    			zoom: 14,
				center: new google.maps.LatLng(35.6108938,139.7330448),
				mapTypeId: google.maps.MapTypeId.ROADMAP,

				mapTypeControl: false,
				mapTypeControlOptions: {
					style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
					position: google.maps.ControlPosition.LEFT_CENTER
				},
				panControl: false,
				panControlOptions: {
					position: google.maps.ControlPosition.TOP_RIGHT
				},
				zoomControl: true,
				zoomControlOptions: {
					style: google.maps.ZoomControlStyle.LARGE,
					position: google.maps.ControlPosition.TOP_LEFT
				},
				scrollwheel: false,
				scaleControl: false,
				scaleControlOptions: {
					position: google.maps.ControlPosition.TOP_LEFT
				},
				streetViewControl: true,
				streetViewControlOptions: {
					position: google.maps.ControlPosition.LEFT_TOP
				},
				styles: [

					{
						"featureType": "administrative.country",
						"elementType": "geometry",
						"stylers": [
							{
								"visibility": "on"
							}
						]
					},
					{
						"featureType": "administrative.province",
						"elementType": "geometry",
						"stylers": [
							{
								"visibility": "on"
							}
						]
					},
					{
						"featureType": "administrative.locality",
						"elementType": "geometry",
						"stylers": [
							{
								"visibility": "on"
							}
						]
					},
					{
						"featureType": "administrative.neighborhood",
						"elementType": "geometry",
						"stylers": [
							{
								"visibility": "on"
							}
						]
					},
					{
						"featureType": "administrative.land_parcel",
						"elementType": "geometry",
						"stylers": [
							{
								"visibility": "on"
							}
						]
					},
					{
						"featureType": "landscape.man_made",
						"elementType": "geometry",
						"stylers": [
							{
								"visibility": "simplified"
							}
						]
					},
					{
						"featureType": "landscape.natural.landcover",
						"elementType": "geometry",
						"stylers": [
							{
								"visibility": "on"
							}
						]
					},
					{
						"featureType": "landscape.natural.terrain",
						"elementType": "geometry",
						"stylers": [
							{
								"visibility": "off"
							}
						]
					},
					{
						"featureType": "poi.attraction",
						"elementType": "geometry",
						"stylers": [
							{
								"visibility": "off"
							}
						]
					},
					{
						"featureType": "poi.business",
						"elementType": "geometry",
						"stylers": [
							{
								"visibility": "off"
							}
						]
					},
					{
						"featureType": "poi.government",
						"elementType": "geometry",
						"stylers": [
							{
								"visibility": "off"
							}
						]
					},
					{
						"featureType": "poi.medical",
						"elementType": "geometry",
						"stylers": [
							{
								"visibility": "off"
							}
						]
					},
					{
						"featureType": "poi.park",
						"elementType": "geometry",
						"stylers": [
							{
								"visibility": "on"
							}
						]
					},
					{
						"featureType": "poi.park",
						"elementType": "labels",
						"stylers": [
							{
								"visibility": "off"
							}
						]
					},
					{
						"featureType": "poi.place_of_worship",
						"elementType": "geometry",
						"stylers": [
							{
								"visibility": "off"
							}
						]
					},
					{
						"featureType": "poi.school",
						"elementType": "geometry",
						"stylers": [
							{
								"visibility": "off"
							}
						]
					},
					{
						"featureType": "poi.sports_complex",
						"elementType": "geometry",
						"stylers": [
							{
								"visibility": "off"
							}
						]
					},
					{
						"featureType": "road.highway",
						"elementType": "geometry",
						"stylers": [
							{
								"visibility": "off"
							}
						]
					},
					{
						"featureType": "road.highway",
						"elementType": "labels",
						"stylers": [
							{
								"visibility": "off"
							}
						]
					},
					{
						"featureType": "road.highway.controlled_access",
						"elementType": "geometry",
						"stylers": [
							{
								"visibility": "off"
							}
						]
					},
					{
						"featureType": "road.arterial",
						"elementType": "geometry",
						"stylers": [
							{
								"visibility": "simplified"
							}
						]
					},
					{
						"featureType": "road.local",
						"elementType": "geometry",
						"stylers": [
							{
								"visibility": "simplified"
							}
						]
					},
					{
						"featureType": "transit.line",
						"elementType": "geometry",
						"stylers": [
							{
								"visibility": "on"
							}
						]
					},
					{
						"featureType": "transit.station.airport",
						"elementType": "geometry",
						"stylers": [
							{
								"visibility": "on"
							}
						]
					},
					{
						"featureType": "transit.station.bus",
						"elementType": "geometry",
						"stylers": [
							{
								"visibility": "on"
							}
						]
					},
					{
						"featureType": "transit.station.rail",
						"elementType": "geometry",
						"stylers": [
							{
								"visibility": "on"
							}
						]
					},
					{
						"featureType": "water",
						"elementType": "geometry",
						"stylers": [
							{
								"visibility": "on"
							}
						]
					},
					{
						"featureType": "water",
						"elementType": "labels",
						"stylers": [
							{
								"visibility": "off"
							}
						]
					}
				]
  });

  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);

  // Add markers for the starting and ending points
  marker1 = new google.maps.Marker({
    position: { lat: 35.5493975, lng: 139.7772637 }, // Starting point coordinates
    map: map,
    title: "Starting Point",
  });

  marker2 = new google.maps.Marker({
    position: { lat: 35.6812405, lng: 139.76454 }, // Ending point coordinates
    map: map,
    title: "Ending Point",
  });

  // Calculate and display the route
  calculateAndDisplayRoute(marker1.getPosition(), marker2.getPosition());
}

function calculateAndDisplayRoute(start, end) {
	marker1.setMap(null); // Remove the marker from the start position
  directionsService.route(
    {
      origin: start,
      destination: end,
      travelMode: google.maps.TravelMode.DRIVING, // Change the travel mode as required
    },
    function (response, status) {
      if (status === "OK") {
        directionsRenderer.setDirections(response);
      } else {
        window.alert("Directions request failed due to " + status);
      }
    }
  );
}



initMap();
