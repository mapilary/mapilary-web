(function() {
  var $,
    _this = this;

  $ = jQuery;

  $(function() {
    var colors, counter, getBg, map;
    colors = ['#f99', '#9f9', '#99f', '#ff9', '#f9f', '#9ff'];
    counter = parseInt(Math.random() * colors.length, 10);
    getBg = function() {
      counter = counter < colors.length - 1 ? counter + 1 : 0;
      return colors[counter];
    };
    $('body').on('click', function() {
      return $('html,body').css('background-color', getBg());
    }).click();
    $('button:submit').on('click', function(ev) {
      var params, trackingNr;
      ev.preventDefault();
      trackingNr = ($(ev.target.form[0])).val();
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
          }).addTo(map);
          socket = io.connect('https://mapilary.com', {
            resource: '/ws/socket.io',
            query: 'apikey=1234'
          });
          socket.on('connect', function() {
            return socket.emit('subscribe', 'trackingNr:' + trackingNr);
          });
          return socket.on('position:update', function(data) {
            coords = data.position.coords;
            latlng = new L.LatLng(coords.latitude, coords.longitude);
            if (!driver) {
              driver = new L.CircleMarker(latlng, {
                radius: 8,
                fillColor: "blue",
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 1
              }).addTo(map);
            } else {
              driver.setLatLng(latlng);
            }
          });
        }
      });
    });
    map = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://ssl_tiles.cloudmade.com/dfc00e1faff14a268dbebec543abfc29/997/256/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
      maxZoom: 18
    }).addTo(map);
    return L.control.locate().addTo(map);
  });

}).call(this);
