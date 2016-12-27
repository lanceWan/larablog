// HeaderSlide
var HeaderSlide = function() {
    "use strict";

    // Handle HeaderSlide
    var handleHeaderSlideFunction = function() {
        $('.header-slide-menu').hide();
        $('.header-slide-menu-trigger').on('click', function(event) {
            event.preventDefault();

            $(this).toggleClass('menu-is-visible');
            $('.header-slide-menu').slideToggle(450);
        });

        $(window).scroll(function(){
            if ($(this).scrollTop() > 1) {
                $('.header-slide-menu').slideUp(450);
            } else {
                $('.header-slide-menu').slideDown(450);
            }
        });
    }

    return {
        init: function() {
            handleHeaderSlideFunction(); // initial setup for header slide
        }
    }
}();

$(document).ready(function() {
    HeaderSlide.init();
});
