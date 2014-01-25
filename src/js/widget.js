(function() {
  var $,
    _this = this;

  $ = jQuery;

  $(function() {
    var widget;
    widget = null;
    $('#tracking-form').on('submit', function(ev) {
      var $map;
      ev.preventDefault();
      $map = $('#map');
      $('html, body').animate({
        scrollTop: $('#content').offset().top
      }, 500, function() {
        $map.show('slow', function() {
          var trackingNr;
          if (!widget) {
            widget = new MapilaryWidget('map', {
              deliveryApikey: '1234',
              findPathApikey: 'MapilaryDR9KQIn09i4mEk2zPxt9',
              showPath: false
            });
          }
          trackingNr = $('#trackingNr').val().toUpperCase();
          widget.trackDelivery(trackingNr);
        });
      });
    });
  });

}).call(this);
