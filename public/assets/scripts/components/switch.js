// Switch
var Switch = function() {
    "use strict";

    // Handle Switch
    var handleSwitch = function() {
        $("[name='theme-checkbox']").bootstrapSwitch();
    }

    return {
        init: function() {
            handleSwitch(); // initial setup for switch
        }
    }
}();

$(document).ready(function() {
    Switch.init();
});
