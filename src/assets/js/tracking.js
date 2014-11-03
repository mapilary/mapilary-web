$(function () {

    var loader, widget

    $('#trackingNr').tipsy({ fade: true, gravity: 'n' });

    function scrollTop (callback) {
        $('body')
            .animate({
                scrollTop: $('#content').offset().top 
            }, 500, callback);
    }

    function loadWidget (trackingNr) {
        if (loader)  { 
            loader._settings.trackingNr = trackingNr;
            return;
        }
        loader = new MapilaryWidgetLoader({ 
            el: $('#widget'),
            notice: 'Tip: You can type trackingNr while widget is loading.',
            trackForm: false,
            trackingNr: trackingNr 
        }).load(function (_widget) {
            widget = _widget.render();
        });
    }

    $('.navbar-toggle').click(function (ev) {
        var data = $(ev.currentTarget).data();
        $(data.target).toggleClass('collapse');
    });

    $('#trackingNr').click(function (ev) {
        if (!widget) scrollTop(loadWidget);
    });

    $('#tracking-form').on('submit', function (ev) {
        ev.preventDefault();
        var trackingNr = $('#trackingNr').val().toUpperCase();
        if (widget) {
            scrollTop();
            widget.trackDelivery(trackingNr);
        } else {
            scrollTop(loadWidget(trackingNr));
        }
    });
});
