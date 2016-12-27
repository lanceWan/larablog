// Theme Dropdown
var ThemeDropdown = function() {
    'use strict';

    // Handle Theme Dropdown Menu
    var handleThemeDropdownMenu = function() {
        $('.theme-dropdown .theme-dropdown-item').on('click', function(e) {
            if ($(this).children('ul').hasClass('theme-dropdown-menu')) {
                if ($(this).children('ul').hasClass('theme-dropdown-menu-visible')) {
                    $(this).children('.theme-dropdown-menu').slideToggle(300);
                    $(this).children('.theme-dropdown-menu').removeClass('theme-dropdown-menu-visible');
                } else {
                    $(this).children('.theme-dropdown-menu').slideToggle(300);
                    $(this).children('.theme-dropdown-menu').addClass('theme-dropdown-menu-visible');
                }
            }
        });
    }

    return {
        init: function() {
            handleThemeDropdownMenu(); // initial setup for topbar dropdown Mmenu
        }
    }
}();

$(document).ready(function() {
    ThemeDropdown.init();
});
