// Header Sticky
var HeaderSticky = function() {
    'use strict';

    // Handle Header Sticky
    var handleHeaderSticky = function() {
        // On loading, check to see if more than 15px, then add the class
        if ($('.header-sticky').offset().top > 15) {
            $('.header-sticky').addClass('header-shrink');
        }

        // On scrolling, check to see if more than 15px, then add the class
        $(window).on('scroll', function() {
            if ($('.header-sticky').offset().top > 15) {
                $('.header-sticky').addClass('header-shrink');
            } else {
                $('.header-sticky').removeClass('header-shrink');
            }
        });
    }

    return {
        init: function() {
            handleHeaderSticky(); // initial setup for header sticky
        }
    }
}();

$(document).ready(function() {
    HeaderSticky.init();
});
