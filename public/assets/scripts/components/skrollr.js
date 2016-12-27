// Skrollr
var Skrollr = function() {
    "use strict";

    // Handle Skrollr
    var handleSkrollr = function() {
        $(document).ready(function() {
            var s = skrollr.init({
                edgeStrategy: "set",
                easing: {
                    WTF: Math.random,
                    inverted: function(p) {
                        return 1-p;
                    }
                }
            }); 
        });
    }

    return {
        init: function() {
            handleSkrollr(); // initial setup for skrollr
        }
    }
}();

$(document).ready(function() {
    Skrollr.init();
});
