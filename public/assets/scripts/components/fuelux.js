// Fuelux
var Fuelux = function() {
    "use strict";

    // Handle Fuelux
    var handleFuelux = function() {
        // Checkbox
        $('.radio-checkbox input').on('change', function () {
            console.log( $(this).is(':checked') );
        });

        // Radio
        $('#radio').radio();

        // Spinbox
        $('.js-spinbox').spinbox('value', 1);

        // Wizard
        $('#js-wizard').wizard();
    }

    return {
        init: function() {
            handleFuelux(); // initial setup for fuelux
        }
    }
}();

$(document).ready(function() {
    Fuelux.init();
});
