// Cube Portfolio
var Portfolio = function() {
    "use strict";

    // Handle Portfolio Grid 3 Columns Grid V2
    var handlePortfolio3ColGridV2 = function() {
        $('#portfolio-3-col-grid-v2').cubeportfolio({
            filters: '#portfolio-3-col-grid-v2-filter',
            layoutMode: 'grid',
            defaultFilter: '*',
            animationType: 'rotateRoom',
            gapHorizontal: 20,
            gapVertical: 20,
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
            handlePortfolio3ColGridV2(); // initial setup for portfolio grid 3 columns grid v2
        }
    }
}();

$(document).ready(function() {
    Portfolio.init();
});
