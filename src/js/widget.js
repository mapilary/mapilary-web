(function() {
  var $,
    _this = this;

  $ = jQuery;

  $(function() {
    var featureGroup, map;
    map = null;
    featureGroup = null;
    return $('button:submit.btn-track').on('click', function(ev) {
      var $map;
      ev.preventDefault();
      $map = $('#map');
      $('html, body').animate({
        scrollTop: $('#content').offset().top
      }, 500, function() {
        return $map.show('slow', function() {
          var params, trackingNr;
          if (!map) {
            map = L.map('map').setView([51.505, -0.09], 13);
            featureGroup = L.featureGroup();
            L.tileLayer('https://ssl_tiles.cloudmade.com/dfc00e1faff14a268dbebec543abfc29/997/256/{z}/{x}/{y}.png', {
              attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
              maxZoom: 18
            }).addTo(map);
            featureGroup.addTo(map);
          } else {
            featureGroup.clearLayers();
          }
          trackingNr = ($(ev.target.form[0])).val().toUpperCase();
          params = {
            trackingNr: trackingNr,
            apikey: '1234'
          };
          return $.get('https://api.mapilary.com/v1/deliveries?', params, function(deliveries) {
            var circle, coords, delivery, driver, latlng, socket;
            driver = null;
            delivery = deliveries[0];
            if (delivery && delivery.deliveryAddresses && delivery.deliveryAddresses.length > 0) {
              coords = delivery.deliveryAddresses[0].coords;
              latlng = new L.LatLng(coords.latitude, coords.longitude);
              map.panTo(latlng);
              circle = new L.CircleMarker(latlng, {
                radius: 8,
                fillColor: "green",
                color: "#000",
                weight: 2,
                opacity: 1,
                fillOpacity: 1
              });
              featureGroup.addLayer(circle);
              socket = io.connect('https://ws.mapilary.com', {
                resource: 'socket.io',
                query: 'apikey=1234'
              });
              socket.on('connect', function() {
                return socket.emit('subscribe', 'trackingNr:' + trackingNr);
              });
              return socket.on('position:update', function(data) {
                var truck;
                coords = data.position.coords;
                latlng = new L.LatLng(coords.latitude, coords.longitude);
                if (!driver) {
                  truck = L.AwesomeMarkers.icon({
                    icon: 'truck',
                    markerColor: 'red',
                    prefix: 'fa'
                  });
                  driver = L.marker(latlng, {
                    icon: truck
                  });
                  featureGroup.addLayer(driver);
                } else {
                  driver.setLatLng(latlng);
                }
                map.fitBounds(featureGroup, {
                  padding: [50, 50]
                });
              });
            }
          });
        });
      });
    });
  });

}).call(this);
