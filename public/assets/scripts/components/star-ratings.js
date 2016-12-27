// Star Ratings
var StarRatings = function() {
    "use strict";

    // Handle Star Ratings
    var handleStarRatings = function() {
        $(document).ready(function () {
            // Rating Input
            $('#rating-input').rating({
                min: 0,
                max: 5,
                step: 1,
                size: 'md',
                showClear: false
            });
            
            // Disabled
            $('#btn-rating-input').on('click', function() {
                $('#rating-input').rating('refresh', {
                    showClear: true, 
                    disabled: !$('#rating-input').attr('disabled')
                });
            });
            
            $('#rating-input').on('rating.change', function() {
                alert($('#rating-input').val());
            });

            // Custom Lable
            $(document).on('ready', function(){
                $('#customLabel').rating({
                    step: 1,
                    starCaptions: {1: 'Very Poor', 2: 'Poor', 3: 'Ok', 4: 'Good', 5: 'Very Good'},
                    starCaptionClasses: {1: 'color-red', 2: 'color-gold', 3: 'color-blue-grey', 4: 'color-base', 5: 'color-teal'}
                });
            });

            // Reset Value
            $(document).on('ready', function(){
                $('#resetRating').rating({});
            });

            // Font Awesome Icons
            $(document).on('ready', function(){
                $('.rating-fa-star').rating({
                    hoverOnClear: false,
                    theme: 'krajee-fa',
                    filledStar: '<i class="fa fa-star"></i>',
                    emptyStar: '<i class="fa fa-star-o"></i>'
                });

                $('.rating-fa-heart').rating({
                    hoverOnClear: false,
                    theme: 'krajee-fa',
                    filledStar: '<i class="fa fa-heart"></i>',
                    emptyStar: '<i class="fa fa-heart-o"></i>'
                });
            });
            
            // Rate with Status
            $('.rb-rating').rating({'showCaption':true, 'stars':'3', 'min':'0', 'max':'3', 'step':'1', 'size':'md', 'starCaptions': {0:'Status: Zero', 1:'Status: Bad', 2:'Status: Average', 3:'Status: Good'}});
        });
    }

    return {
        init: function() {
            handleStarRatings(); // initial setup for star ratings
        }
    }
}();

$(document).ready(function() {
    StarRatings.init();
});
