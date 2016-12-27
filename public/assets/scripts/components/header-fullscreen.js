// Header Vertical Dropdown
var HeaderFullscreen = function() {
    "use strict";

    // Handle Header Vertical Dropdown Toggle
    var handleHeaderFullscreenToggle = function() {
        $('.header-fullscreen-menu .nav-item').children('a').on('click', function(event) {
            event.preventDefault();
            $(this).toggleClass('nav-item-open').next('.nav-dropdown-menu').slideToggle(400).end().parent('.nav-item').siblings('.nav-item').children('a').removeClass('nav-item-open').next('.nav-dropdown-menu').slideUp(400);
        });
    }

    return {
        init: function() {
            handleHeaderFullscreenToggle(); // initial setup for header vertical dropdown toggle
        }
    }
}();

$(document).ready(function() {
    HeaderFullscreen.init();
});
