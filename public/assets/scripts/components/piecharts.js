// Pie Chart
var Piechart = function() {
    "use strict";

    // Handle Pie Chart
    var handlePiechart = function() {
        // Circles 1
        Circles.create({
            id: 'circles-1',
            radius: 55,
            value: 55,
            width: 5,
            textClass: 'circles-text-v1',
            text: function(value) {
                return value + '%';
            },
            colors: ['#fff', '#00bcd4'],
            duration: 1500
        });

        // Circles 2
        Circles.create({
            id: 'circles-2',
            radius: 55,
            value: 72,
            width: 5,
            textClass: 'circles-text-v1',
            text: function(value) {
                return value + '%';
            },
            colors: ['#fff', '#00bcd4'],
            duration: 1500
        });

        // Circles 3
        Circles.create({
            id: 'circles-3',
            radius: 55,
            value: 69,
            width: 5,
            textClass: 'circles-text-v1',
            text: function(value) {
                return value + '%';
            },
            colors: ['#fff', '#00bcd4'],
            duration: 1500
        });

        // Circles 4
        Circles.create({
            id: 'circles-4',
            radius: 65,
            value: 72,
            width: 65,
            textClass: 'circles-text-v2',
            text: function(value) {
                return value + '%';
            },
            colors: ['rgba(0,188,212,.6)', 'rgba(0,188,212,1)'],
            duration: 1500
        });

        // Circles 5
        Circles.create({
            id: 'circles-5',
            radius: 65,
            value: 63,
            width: 65,
            textClass: 'circles-text-v2',
            text: function(value) {
                return value + '%';
            },
            colors: ['rgba(236,118,140,.6)', 'rgba(236,118,140,1)'],
            duration: 1500
        });

        // Circles 6
        Circles.create({
            id: 'circles-6',
            radius: 65,
            value: 50,
            width: 65,
            textClass: 'circles-text-v2',
            text: function(value) {
                return value + '%';
            },
            colors: ['rgba(193,131,214,.6)', 'rgba(193,131,214,1)'],
            duration: 1500
        });

        // Circles 7
        Circles.create({
            id: 'circles-7',
            radius: 65,
            value: 82,
            width: 65,
            textClass: 'circles-text-v2',
            text: function(value) {
                return value + '%';
            },
            colors: ['rgba(0,150,136,.6)', 'rgba(0,150,136,1)'],
            duration: 1500
        });
    }

    return {
        init: function() {
            handlePiechart(); // initial setup for pie chart
        }
    }
}();

$(document).ready(function() {
    Piechart.init();
});
