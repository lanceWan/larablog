// Cube Portfolio
var Portfolio = function() {
    "use strict";

    // Handle Portfolio 3 Columns Fullwidth
    var handlePortfolio3ColFullwidth = function() {
        $('#portfolio-3-col-fullwidth').cubeportfolio({
            filters: '#portfolio-3-col-fullwidth-filter',
            layoutMode: 'grid',
            defaultFilter: '*',
            animationType: 'rotateRoom',
            gapHorizontal: 0,
            gapVertical: 0,
            gridAdjustment: 'responsive',
            mediaQueries: [{
                width: 1500,
                cols: 3
            }, {
                width: 1100,
                cols: 3
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
            handlePortfolio3ColFullwidth(); // initial setup for portfolio 3 columns fullwidth
        }
    }
}();

$(document).ready(function() {
    Portfolio.init();
});
