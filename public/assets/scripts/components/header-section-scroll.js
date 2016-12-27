// Header Section Scroll
var HeaderSectionScroll = function() {
    'use strict';

    // Handle Header Section Scroll Nav
    var handleHeaderSectionScrollNav = function() {
        // Activate Header Section Scroll Menu
        var $body = $(document.body);
        var navHeight = $('.header-section-scroll .navbar').outerHeight(true) + 10;

        $body.scrollspy({
            target: '.header-section-scroll .nav-collapse',
            offset: navHeight
        });

        // Smooth Scrolling Sections
        $('.header-section-scroll .nav-item-child').on('click', function(event) {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[href' + this.hash.slice(1) +']');
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: target.offset().top - 0
                    }, 1000);
                    return false;
                }
            }
        });

        // Navbar Collapse On Scroll
        $(window).scroll(function() {
            if ($('.header-section-scroll .navbar').offset().top > 250) {
                $('.header-section-scroll .navbar-collapse.in').collapse('hide');
                $('.header-section-scroll .toggle-icon').addClass('is-clicked');
            } else {
                $('.header-section-scroll .navbar-collapse.in').collapse('show');
                $('.header-section-scroll .toggle-icon').removeClass('is-clicked');
            }
        });

        // Collapse Navbar When It's Clickicked
        $(window).scroll(function() {
            $('.header-section-scroll .navbar-collapse.in').collapse('hide');
        });
    }

    return {
        init: function() {
            handleHeaderSectionScrollNav(); // initial setup for header Section Scroll nav
        }
    }
}();

$(document).ready(function() {
    HeaderSectionScroll.init();
});
