import Ember from 'ember';

export default Ember.View.extend({

  layoutName: 'get-started/item/layout',

  GoogleMap: Ember.View.extend({
    templateName: 'get-started/item/partials/address-map',

    map: null,

    didInsertElement: function() {
      var canvas = document.getElementById('map-canvas');

      var markers = [];
      var map = new google.maps.Map(canvas, {
        mapTypeId: google.maps.MapTypeId.HYBRID,
        center: new google.maps.LatLng(39.5, -98.35),
        mapTypeControl: false,
        zoom: 4
      });

      // Create the search box and link it to the UI element.
      var input = /** @type {HTMLInputElement} */(
        document.getElementById('google-address'));

      var searchBox = new google.maps.places.SearchBox(
        /** @type {HTMLInputElement} */(input));

      // Listen for the event fired when the user selects an item from the
      // pick list. Retrieve the matching places for that item.
      google.maps.event.addListener(searchBox, 'places_changed', function() {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
          return;
        }
        for (var i = 0, marker; marker = markers[i]; i++) {
          marker.setMap(null);
        }

        // For each place, get the icon, place name, and location.
        markers = [];
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0, place; place = places[i]; i++) {
          var image = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
          };

          // Create a marker for each place.
          var marker = new google.maps.Marker({
            map: map,
            icon: image,
            title: place.name,
            position: place.geometry.location
          });

          markers.push(marker);

          bounds.extend(place.geometry.location);
        }

        map.fitBounds(bounds);
      });

      // Bias the SearchBox results towards places that are within the bounds of the
      // current map's viewport.
      google.maps.event.addListener(map, 'bounds_changed', function() {
        var bounds = map.getBounds();
        searchBox.setBounds(bounds);
      });


    }
  })
});
