// Cube Portfolio
var Portfolio = function() {
    "use strict";

    // Handle Portfolio 5 Columns Grid
    var handlePortfolioSlider5ColGrid = function() {
        $('#portfolio-slider-5-col-grid').cubeportfolio({
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
                cols: 5
            }, {
                width: 1100,
                cols: 5
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
            handlePortfolioSlider5ColGrid(); // initial setup for portfolio 5 columns grid
        }
    }
}();

$(document).ready(function() {
    Portfolio.init();
});
