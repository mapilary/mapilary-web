(function() {
  var $, widget,
    _this = this;
  $ = jQuery;

  $(function() {
    $('#trackingNr').tipsy({
      fade: true,
      gravity: 'n'
    });

    $('.navbar-toggle').click(function(ev) {
      var data = $(ev.currentTarget).data();
      $(data.target).toggleClass('collapse');
    });

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