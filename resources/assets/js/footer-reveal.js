// Footer Reveal
var FooterReveal = function() {
    "use strict";

    // Handle Footer Reveal
    var handleFooterReveal = function() {
        $('.footer-reveal').footerReveal();
    }

    return {
        init: function() {
            handleFooterReveal(); // initial setup for footer reveal
        }
    }
}();

$(document).ready(function() {
    FooterReveal.init();
});
