// Cube Portfolio
var Portfolio = function() {
    "use strict";

    // Handle Portfolio 5 Columns Grid
    var handlePortfolio5ColGrid = function() {
        $('#portfolio-5-col-grid').cubeportfolio({
            filters: '#portfolio-5-col-grid-filter',
            layoutMode: 'grid',
            defaultFilter: '*',
            animationType: 'rotateRoom',
            gapHorizontal: 10,
            gapVertical: 10,
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
            handlePortfolio5ColGrid(); // initial setup for portfolio 5 columns grid
        }
    }
}();

$(document).ready(function() {
    Portfolio.init();
});
