// Cube Portfolio
var Portfolio = function() {
    "use strict";

    // Handle Portfolio Grid
    var handlePortfolioGrid = function() {
        $('#portfolio-grid').cubeportfolio({
            filters: '#portfolio-grid-filter',
            loadMore: '#portfolio-grid-load-more-button',
            loadMoreAction: 'click',
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
            handlePortfolioGrid(); // initial setup for portfolio grid
        }
    }
}();

$(document).ready(function() {
    Portfolio.init();
});
