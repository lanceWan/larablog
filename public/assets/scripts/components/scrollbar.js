// Scrollbar
var Scrollbar = function() {
    "use strict";

    // Handle Scrollbar Linear
    var handleScrollbarLinear = function() {
        $(".scrollbar").mCustomScrollbar({
            theme: "minimal-dark"
        });
    }

    return {
        init: function() {
            handleScrollbarLinear(); // initial setup for scrollbar linear
        }
    }
}();

$(document).ready(function() {
    Scrollbar.init();
});
