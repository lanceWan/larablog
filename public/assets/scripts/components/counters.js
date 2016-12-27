// Counters
var Counters = function() {
    "use strict";

    // Handle Counters
    var handleCounter = function() {
        $('.counter').counterUp({
            delay: 10,
            time: 1000
        });
    }

    return {
        init: function() {
            handleCounter(); // initial setup for counter
        }
    }
}();

$(document).ready(function() {
    Counters.init();
});
