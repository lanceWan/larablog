// Google Map --- https://developers.google.com/maps/documentation/javascript/
var GoogleMap = function() {
    "use strict";

    var handleGoogleMaps = function() {
        function initialize() {
            // Specify features and elements to define styles.
            var styleArray = [{
                featureType: "all",
                stylers: [{
                    saturation: -80
                }]
            }, {
                featureType: "road.arterial",
                elementType: "geometry",
                stylers: [{
                    hue: "#00ffee"
                }, {
                    saturation: 50
                }]
            }, {
                featureType: "poi.business",
                elementType: "labels",
                stylers: [{
                    visibility: "off"
                }]
            }];

            // Create a map object and specify the DOM element for display.  ,
            var Bedford = new google.maps.LatLng(40.80133576, -73.27331543);
			var Brooklyn = new google.maps.LatLng(40.714232, -73.96128899);
			var TestMiddle = new google.maps.LatLng(40.79405849, -73.56033325);
            var map = new google.maps.Map(document.getElementById('map'), {
                center: TestMiddle,
                styles: styleArray,
                scrollwheel: false,
                zoom: 10,
                streetViewControl: false,
                mapTypeControl: false,
                zoomControl: true,
                scaleControl: false
            });
			
            var coordInfoWindow = new google.maps.InfoWindow();
            coordInfoWindow.setContent(createInfoWindowContent(Bedford, map.getZoom()));
            coordInfoWindow.setPosition(Bedford);
            coordInfoWindow.open(map);

            var coordInfoWindow2 = new google.maps.InfoWindow();
            coordInfoWindow2.setContent(createInfoWindowContent2(Brooklyn, map.getZoom()));
            coordInfoWindow2.setPosition(Brooklyn);
            coordInfoWindow2.open(map);

            map.addListener('zoom_changed', function() {
                coordInfoWindow.setContent(createInfoWindowContent(Bedford, map.getZoom()));
                coordInfoWindow.open(map);
            });

            var TILE_SIZE = 256;

            function createInfoWindowContent(latLng, zoom) {
                var scale = 1 << zoom;

                var worldCoordinate = project(latLng);

                var pixelCoordinate = new google.maps.Point(
                    Math.floor(worldCoordinate.x * scale),
                    Math.floor(worldCoordinate.y * scale));

                var tileCoordinate = new google.maps.Point(
                    Math.floor(worldCoordinate.x * scale / TILE_SIZE),
                    Math.floor(worldCoordinate.y * scale / TILE_SIZE));

                return [
                    '73rd Pl, Glendale, <br> NY 11385, <br> <a href="https://goo.gl/maps/prESgArb7WS2" target="_blank">Get Directions</a>'
                ].join('<br>');
            }


            function createInfoWindowContent2(latLng, zoom) {
                var scale = 1 << zoom;

                var worldCoordinate = project(latLng);

                var pixelCoordinate = new google.maps.Point(
                    Math.floor(worldCoordinate.x * scale),
                    Math.floor(worldCoordinate.y * scale));

                var tileCoordinate = new google.maps.Point(
                    Math.floor(worldCoordinate.x * scale / TILE_SIZE),
                    Math.floor(worldCoordinate.y * scale / TILE_SIZE));

                return [
                    '178 S 1st St, Brooklyn, <br/> NY 11211 <br/> <a href="https://goo.gl/maps/rNNBJHQUQ8M2" target="_blank">Get Directions</a>'
                ].join('<br>');
            }

            // The mapping between latitude, longitude and pixels is defined by the web
            // mercator projection.
            function project(latLng) {
                var siny = Math.sin(latLng.lat() * Math.PI / 180);

                // Truncating to 0.9999 effectively limits latitude to 89.189. This is
                // about a third of a tile past the edge of the world tile.
                siny = Math.min(Math.max(siny, -0.9999), 0.9999);

                return new google.maps.Point(
                    TILE_SIZE * (0.5 + latLng.lng() / 360),
                    TILE_SIZE * (0.5 - Math.log((1 + siny) / (1 - siny)) / (4 * Math.PI)));
            }
        }
        google.maps.event.addDomListener(window, 'load', initialize);
    }

    return {
        init: function() {
            handleGoogleMaps(); // initial setup for google map
        }
    }
}();

$(document).ready(function() {
    GoogleMap.init();
});