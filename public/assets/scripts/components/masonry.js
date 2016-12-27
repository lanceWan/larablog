// Masonry
var Masonry = function() {
    "use strict";

    // Handle Masonry Grid
    var handleMasonryGrid = function() {
        $(document).ready(function(){
            var $container = $('.masonry-grid');
            // initialize Masonry after all images have loaded
            $container.imagesLoaded(function() {
                $container.masonry({
                    itemSelector: '.masonry-grid-item',
                    columnWidth: 1,
                    percentPosition: true,
                    transitionDuration: '0.5s'
                });
            });
        });
    }

    return {
        init: function() {
            handleMasonryGrid(); // initial setup for masonry grid
        }
    }
}();

$(document).ready(function() {
    Masonry.init();
});
