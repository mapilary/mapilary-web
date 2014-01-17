$ = jQuery

$ =>
    map = null
    featureGroup = null
    # document ready code in here
    $('button:submit.btn-track').on 'click', (ev)->
        ev.preventDefault()
        $('#map').show 'slow', ()->
            if !map
                map = L.map('map').setView([51.505, -0.09], 13)
                featureGroup = L.featureGroup();
                L.tileLayer('https://ssl_tiles.cloudmade.com/dfc00e1faff14a268dbebec543abfc29/997/256/{z}/{x}/{y}.png', {
                    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
                    maxZoom: 18
                }).addTo(map)
                L.control.locate().addTo(map)
                featureGroup.addTo(map)
            else
                featureGroup.clearLayers();
            trackingNr = ($ ev.target.form[0]).val().toUpperCase();
            params = {
                trackingNr: trackingNr,
                apikey: '1234'
            }
            $.get 'https://api.mapilary.com/v1/deliveries?', params, (deliveries)->
                driver = null
                delivery = deliveries[0]
                if delivery && delivery.deliveryAddresses && delivery.deliveryAddresses.length > 0
                    coords = delivery.deliveryAddresses[0].coords
                    latlng = new L.LatLng(coords.latitude, coords.longitude)
                    map.panTo(latlng)
                    circle = new L.CircleMarker(latlng, {
                        radius: 8,
                        fillColor: "green",
                        color: "#000",
                        weight: 2,
                        opacity: 1,
                        fillOpacity: 1,
                    })
                    featureGroup.addLayer(circle);
                    socket = io.connect('https://ws.mapilary.com', {resource: 'socket.io', query: 'apikey=1234'})
                    socket.on 'connect', ->
                        socket.emit 'subscribe', 'trackingNr:' + trackingNr
                    socket.on 'position:update', (data)->
                        coords = data.position.coords
                        latlng = new L.LatLng(coords.latitude, coords.longitude)
                        if !driver
                            driver = new L.CircleMarker(latlng, {
                                radius: 8,
                                fillColor: "blue",
                                color: "#000",
                                weight: 1,
                                opacity: 1,
                                fillOpacity: 1,
                            })
                            featureGroup.addLayer(driver)
                        else
                            driver.setLatLng(latlng)
                        map.fitBounds(featureGroup);
                        return
        return
