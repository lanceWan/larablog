// FullPage
var FullPage = function() {
    "use strict";

    // Handle FullPage
    var handleFullPage = function() {
        $('.fullpage').fullpage({
            anchors: ['firstPage', 'secondPage', 'thirdPage'],
            navigation: true,
            sectionsColor: ['#fbf9f5', '#fff', '#fbf9f5'],
            navigationPosition: 'right',
            navigationTooltips: ['First', 'Second', 'Third']
        });
    }

    return {
        init: function() {
            handleFullPage(); // initial setup for fullPage
        }
    }
}();

$(document).ready(function() {
    FullPage.init();
});
