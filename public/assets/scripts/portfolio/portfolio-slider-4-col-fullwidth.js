// Cube Portfolio
var Portfolio = function() {
    "use strict";

    // Handle Portfolio slider 4 Columns Fullwidth
    var handlePortfolioSlider4ColFullwidth = function() {
        $('#portfolio-slider-4-col-fullwidth').cubeportfolio({
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
                cols: 4
            }, {
                width: 1100,
                cols: 4
            }, {
                width: 800,
                cols: 4
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
            handlePortfolioSlider4ColFullwidth(); // initial setup for portfolio slider 4 columns fullwidth
        }
    }
}();

$(document).ready(function() {
    Portfolio.init();
});
