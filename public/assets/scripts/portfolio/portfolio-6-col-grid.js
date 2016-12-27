// Cube Portfolio
var Portfolio = function() {
    "use strict";

    // Handle Portfolio 6 Columns Grid
    var handlePortfolio6ColGrid = function() {
        $('#portfolio-6-col-grid').cubeportfolio({
            filters: '#portfolio-6-col-grid-filter',
            layoutMode: 'grid',
            defaultFilter: '*',
            animationType: 'rotateRoom',
            gapHorizontal: 10,
            gapVertical: 10,
            gridAdjustment: 'responsive',
            mediaQueries: [{
                width: 1500,
                cols: 6
            }, {
                width: 1100,
                cols: 6
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
            handlePortfolio6ColGrid(); // initial setup for portfolio 6 columns grid
        }
    }
}();

$(document).ready(function() {
    Portfolio.init();
});
