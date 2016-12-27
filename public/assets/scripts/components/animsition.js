// Animsition
var Animsition = function() {
    "use strict";

    // Handle Animsition Function
    var handleAnimsitionFunction = function() {
        $(document).ready(function() {
            $(".animsition").animsition({
                inClass: 'fade-in',
                outClass: 'fade-out',
                inDuration: 1500,
                outDuration: 800,
                loading: true,
                loadingParentElement: 'html',
                loadingClass: 'animsition-loading',
                // loadingInner: '', // e.g '<img src="loading.svg" />'
                timeout: false,
                timeoutCountdown: 5000,
                onLoadEvent: true,
                browser: [
                    'animation-duration',
                    '-webkit-animation-duration',
                    '-moz-animation-duration',
                    '-o-animation-duration'
                    ],
                overlay: false,
                overlayClass: 'animsition-overlay-slide',
                overlayParentElement: 'html',
                transition: function(url){ window.location.href = url; }
            });
        });
    }

    return {
        init: function() {
            handleAnimsitionFunction(); // initial setup for animsition function
        }
    }
}();

$(document).ready(function() {
    Animsition.init();
});
