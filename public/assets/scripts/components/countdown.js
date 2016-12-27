// Countdown
var Countdown = function() {
    "use strict";

    // Handle Countdown
    var handleCountdown = function() {
        var newYear = new Date(); 
            newYear = new Date(newYear.getFullYear() + 1, 1 - 1, 1); 
            $('#countdown').countdown({until: newYear}); 
    }

    return {
        init: function() {
            handleCountdown(); // initial setup for countdown
        }
    }
}();

$(document).ready(function() {
    Countdown.init();
});
