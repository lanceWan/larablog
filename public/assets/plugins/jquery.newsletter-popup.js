/* ===========================================================
 * jquery-subscribe-better.js v1
 * ===========================================================
 * Copyright 2014 Pete Rojwongsuriya.
 * http://www.thepetedesign.com
 *
 * Create a better, highly customizable subscription modal or
 * newsletter signup window with jQuery Subscribe Better
 *
 * https://github.com/peachananr/subscribe-better
 *
 * ========================================================== */

! function($) {

    var defaults = {
        trigger: "atendpage", // atendpage | onload | onidle
        animation: "fade", // fade
        delay: 0,
        showOnce: true,
        autoClose: false,
        scrollableModal: false
    };

    $.fn.newsletterPopup = function(options) {
        var settings = $.extend({}, defaults, options),
            el = $(this),
            shown = false,
            animating = false;

        el.addClass("newsletter-popup");

        $.fn.openWindow = function() {
            var el = $(this);
            if (el.is(":hidden") && shown == false && animating == false) {
                animating = true;

                setTimeout(function() {
                    if (settings.scrollableModal == true) {
                        if ($(".newsletter-popup-overlay").length < 1) {
                            $("body").append("<div class='newsletter-popup-overlay'><div class='newsletter-popup-close-backdrop'></div><div class='newsletter-popup newsletter-popup-withoverlay'>" + $(".newsletter-popup").html() + "</div></div>");
                            $(".newsletter-popup-close-backdrop, .newsletter-popup-close-btn").one("click", function() {
                                $(".newsletter-popup.newsletter-popup-withoverlay").closeWindow();
                                return false;
                            });
                            $(".newsletter-popup.newsletter-popup-withoverlay").removeClass("newsletter-popup-animation-" + settings.animation.replace('In', 'Out')).addClass("newsletter-popup-animation-" + settings.animation);
                            setTimeout(function() {
                                $(".newsletter-popup.newsletter-popup-withoverlay").show();
                                $("body").addClass("newsletter-popup-open newsletter-popup-open-with-overlay");
                            }, 300);
                        }
                    } else {
                        if ($(".newsletter-popup-overlay").length < 1) {
                            $("body").append("<div class='newsletter-popup-overlay'><div class='newsletter-popup-close-backdrop'></div></div>");
                            $(".newsletter-popup").removeClass("newsletter-popup-animation-" + settings.animation.replace('In', 'Out')).addClass("newsletter-popup-animation-" + settings.animation);
                            $(".newsletter-popup-close-backdrop, .newsletter-popup-close-btn").one("click", function() {
                                $(".newsletter-popup").closeWindow();
                                return false;
                            });
                            setTimeout(function() {
                                $(".newsletter-popup").show();
                                $("body").addClass("newsletter-popup-open");
                            }, 300);
                        }

                    }
                    if (settings.showOnce == true) shown = true;
                    animating = false;
                }, settings.delay);
            }
        }

        $.fn.closeWindow = function() {
            var el = $(this);
            if (el.is(":visible") && animating == false) {
                animating = true;
                if (settings.scrollableModal == true) {

                    $(".newsletter-popup.newsletter-popup-withoverlay").removeClass("newsletter-popup-animation-" + settings.animation).addClass("newsletter-popup-animation-" + settings.animation.replace('In', 'Out'));

                    setTimeout(function() {
                        $(".newsletter-popup.newsletter-popup-withoverlay").hide();
                        $("body").removeClass("newsletter-popup-open newsletter-popup-open-with-overlay");
                        setTimeout(function() {
                            $(".newsletter-popup-overlay").remove();
                        }, 300);
                    }, 300);

                } else {

                    $(".newsletter-popup").removeClass("newsletter-popup-animation-" + settings.animation).addClass("newsletter-popup-animation-" + settings.animation.replace('In', 'Out'));
                    setTimeout(function() {
                        $(".newsletter-popup").hide();
                        $("body").removeClass("newsletter-popup-open");
                        setTimeout(function() {
                            $(".newsletter-popup-overlay").remove();
                        }, 300);
                    }, 300);
                }
                animating = false;
            }
        }

        $.fn.scrollDetection = function(trigger, onDone) {
            var t, l = (new Date()).getTime();

            $(window).scroll(function() {
                var now = (new Date()).getTime();

                if (now - l > 400) {
                    $(this).trigger('scrollStart');
                    l = now;
                }

                clearTimeout(t);
                t = setTimeout(function() {
                    $(window).trigger('scrollEnd');
                }, 300);
            });
            if (trigger == "scrollStart") {
                $(window).bind('scrollStart', function() {
                    $(window).unbind('scrollEnd');
                    onDone();
                });
            }

            if (trigger == "scrollEnd") {
                $(window).bind('scrollEnd', function() {
                    $(window).unbind('scrollStart');
                    onDone();
                });
            }
        }

        switch (settings.trigger) {
            case "atendpage":
                $(window).scroll(function() {
                    var yPos = $(window).scrollTop();
                    if (yPos >= ($(document).height() - $(window).height())) {
                        el.openWindow();
                    } else {
                        if (yPos + 300 < ($(document).height() - $(window).height())) {
                            if (settings.autoClose == true) {
                                el.closeWindow();
                            }
                        }
                    }

                });
                break;
            case "onload":

                $(window).load(function() {
                    el.openWindow();
                    if (settings.autoClose == true) {
                        el.scrollDetection("scrollStart", function() {
                            el.closeWindow();
                        });

                    }
                });

                break;
            case "onidle":

                $(window).load(function() {
                    el.scrollDetection("scrollEnd", function() {
                        el.openWindow();
                    });

                    if (settings.autoClose == true) {
                        el.scrollDetection("scrollStart", function() {
                            el.closeWindow();
                        });
                    }
                });

                break;
        }


    }

}(window.jQuery);