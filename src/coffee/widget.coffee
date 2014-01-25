$ = jQuery

$ =>
    widget = null;
    # document ready code in here
    $('#tracking-form').on 'submit', (ev) ->
        ev.preventDefault()
        $map = $('#map')
        $('html, body').animate {scrollTop: $('#content').offset().top}, 500, ->
            $map.show 'slow', () ->
                if (!widget)
                    widget = new MapilaryWidget 'map', {
                        deliveryApikey: '1234',
                        findPathApikey: 'MapilaryDR9KQIn09i4mEk2zPxt9'
                        showPath: false
                    }
                trackingNr = $('#trackingNr').val().toUpperCase();
                widget.trackDelivery(trackingNr);
                return
            return
        return
    return