// Cube Portfolio
var Portfolio = function() {
    "use strict";

    // Handle Portfolio slider 2 Columns Fullwidth
    var handlePortfolioSlider2ColFullwidth = function() {
        $('#portfolio-slider-2-col-fullwidth').cubeportfolio({
            layoutMode: 'slider',
            drag: true,
            auto: false,
            autoTimeout: 5000,
            autoPauseOnHover: true,
            showNavigation: true,
            showPagination: false,
            rewindNav: false,
            scrollByPage: false,
            gridAdjustment: 'responsive',
            mediaQueries: [{
                width: 1500,
                cols: 2
            }, {
                width: 1100,
                cols: 2
            }, {
                width: 800,
                cols: 2
            }, {
                width: 550,
                cols: 2
            }, {
                width: 320,
                cols: 1
            }],
            gapHorizontal: 0,
            gapVertical: 0,
            caption: ' ',
            displayType: 'bottomToTop',
            displayTypeSpeed: 100,

            // lightbox
            lightboxDelegate: '.cbp-lightbox',
            lightboxGallery: true,
            lightboxTitleSrc: 'data-title',
            lightboxCounter: '<div class="cbp-popup-lightbox-counter">{{current}} of {{total}}</div>',
        });
    }

    return {
        init: function() {
            handlePortfolioSlider2ColFullwidth(); // initial setup for portfolio slider 2 columns fullwidth
        }
    }
}();

$(document).ready(function() {
    Portfolio.init();
});
