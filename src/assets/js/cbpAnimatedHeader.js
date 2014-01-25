var cbpAnimatedHeader = (function() {
    var b = document.documentElement,
        g = document.querySelector(".cbp-af-header"),
        e = false,
        a = 30;

    function f() {
        $(window).scroll(function (h) {
            if (!e) {
                e = true;
                setTimeout(d, 250);
            }
        });
    }

    function d() {
        var h = c();
        if (h >= a) {
            classie.add(g, "cbp-af-header-shrink");
        } else {
            classie.remove(g, "cbp-af-header-shrink");
        }
        e = false;
    }

    function c() {
        return window.pageYOffset || b.scrollTop;
    }
    f();
})();