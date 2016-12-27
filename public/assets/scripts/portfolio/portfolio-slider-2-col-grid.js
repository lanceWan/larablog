// Cube Portfolio
var Portfolio = function() {
    "use strict";

    // Handle Portfolio 2 Columns Grid
    var handlePortfolioSlider2ColGrid = function() {
        $('#portfolio-slider-2-col-grid').cubeportfolio({
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
            gapVertical: 20,
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
            handlePortfolioSlider2ColGrid(); // initial setup for portfolio 2 columns grid
        }
    }
}();

$(document).ready(function() {
    Portfolio.init();
});
