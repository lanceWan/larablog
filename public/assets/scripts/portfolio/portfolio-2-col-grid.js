// Cube Portfolio
var Portfolio = function() {
    "use strict";

    // Handle Portfolio 2 Columns Grid
    var handlePortfolio2ColGrid = function() {
        $('#portfolio-2-col-grid').cubeportfolio({
            filters: '#portfolio-2-col-grid-filter',
            layoutMode: 'grid',
            defaultFilter: '*',
            animationType: 'rotateRoom',
            gapHorizontal: 30,
            gapVertical: 30,
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
            handlePortfolio2ColGrid(); // initial setup for portfolio 2 columns grid
        }
    }
}();

$(document).ready(function() {
    Portfolio.init();
});
