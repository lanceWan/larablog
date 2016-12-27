// Cube Portfolio
var Portfolio = function() {
    "use strict";

    // Handle Portfolio 4 Columns Fullwidth
    var handlePortfolio4ColFullwidth = function() {
        $('#portfolio-4-col-fullwidth').cubeportfolio({
            filters: '#portfolio-4-col-fullwidth-filter',
            layoutMode: 'grid',
            defaultFilter: '*',
            animationType: 'rotateRoom',
            gapHorizontal: 0,
            gapVertical: 0,
            gridAdjustment: 'responsive',
            mediaQueries: [{
                width: 1500,
                cols: 4
            }, {
                width: 1100,
                cols: 4
            }, {
                width: 800,
                cols: 3
            }, {
                width: 550,
                cols: 2
            }, {
                width: 320,
                cols: 1
            }],
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
            handlePortfolio4ColFullwidth(); // initial setup for portfolio 4 columns fullwidth
        }
    }
}();

$(document).ready(function() {
    Portfolio.init();
});
