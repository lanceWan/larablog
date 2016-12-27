// Header Vertical Dropdown
var HeaderVerticalDropdown = function() {
    "use strict";

    // Handle Header Vertical Dropdown Toggle
    var handleHeaderVerticalDropdownToggle = function() {
        $('.header-vertical-menu .js__nav-item').children('a').on('click', function(event) {
            event.preventDefault();
            $(this).toggleClass('nav-item-open').next('.js__nav-dropdown-menu').slideToggle(400).end().parent('.js__nav-item').siblings('.js__nav-item').children('a').removeClass('nav-item-open').next('.js__nav-dropdown-menu').slideUp(400);
        });
    }

    return {
        init: function() {
            handleHeaderVerticalDropdownToggle(); // initial setup for header vertical dropdown toggle
        }
    }
}();

$(document).ready(function() {
    HeaderVerticalDropdown.init();
});
