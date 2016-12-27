// Cube Portfolio
var Portfolio = function() {
    "use strict";

    // Handle Portfolio Grid 3 Columns Grid
    var handlePortfolio3ColGrid = function() {
        $('#portfolio-3-col-grid').cubeportfolio({
            filters: '#portfolio-3-col-grid-filter',
            layoutMode: 'grid',
            defaultFilter: '*',
            animationType: 'rotateRoom',
            gapHorizontal: 30,
            gapVertical: 30,
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
            handlePortfolio3ColGrid(); // initial setup for portfolio grid 3 Columns Grid
        }
    }
}();

$(document).ready(function() {
    Portfolio.init();
});
