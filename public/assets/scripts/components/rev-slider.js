// Revolution Slider
var RevSlider = function() {
    "use strict";

    // Handle Revolution Slider Layout 1
    var handleRevSliderLayout1 = function() {
        var tpj=jQuery;         
        var revapi1;
        tpj(document).ready(function() {
            if(tpj("#rev-slider1").revolution == undefined){
                revslider_showDoubleJqueryError("#rev-slider1");
            } else {
                revapi1 = tpj("#rev-slider1").show().revolution({
                    sliderType: "standard",
                    jsFileLocation: "assets/plugins/rev-slider/js/",
                    sliderLayout: "fullscreen",
                    dottedOverlay: "none",
                    delay: 9000,
                    navigation: {
                        keyboardNavigation: "on",
                        keyboard_direction: "horizontal",
                        mouseScrollNavigation: "off",
                        onHoverStop: "off",
                        touch: {
                            touchenabled: "on",
                            swipe_threshold: 75,
                            swipe_min_touches: 1,
                            swipe_direction: "horizontal",
                            drag_block_vertical: false
                        },
                        arrows: {
                            style: "metis",
                            enable: true,
                            hide_onmobile: true,
                            hide_under: 768,
                            hide_onleave: false,
                            tmp: '',
                            left: {
                                h_align: "left",
                                v_align: "center",
                                h_offset: 0,
                                v_offset: 0
                            },
                            right: {
                                h_align: "right",
                                v_align: "center",
                                h_offset: 0,
                                v_offset: 0
                            }
                        },
                    },
                    responsiveLevels: [1240,1024,778,480],
                    gridwidth: [1240,1024,778,480],
                    gridheight: [868,768,960,720],
                    lazyType: "smart",
                    parallax: {
                        type: "mouse",
                        origo: "slidercenter",
                        speed: 2000,
                        levels: [2,3,4,5,6,7,12,16,10,50],
                    },
                    shadow: 0,
                    spinner: "off",
                    stopLoop: "off",
                    stopAfterLoops: -1,
                    stopAtSlide: -1,
                    shuffle: "off",
                    autoHeight: "off",
                    fullScreenOffsetContainer: ".rev-slider-offset",
                    hideThumbsOnMobile: "off",
                    hideSliderAtLimit: 0,
                    hideCaptionAtLimit: 0,
                    hideAllCaptionAtLilmit: 0,
                    debugMode: false,
                    fallbacks: {
                        simplifyAll: "off",
                        nextSlideOnWindowFocus: "off",
                        disableFocusListener: false,
                    }
                });
            }
        });
    }

    // Handle Revolution Slider Layout 2
    var handleRevSliderLayout2 = function() {
        var tpj=jQuery;         
        var revapi2;
        tpj(document).ready(function() {
            if(tpj("#rev-slider2").revolution == undefined){
                revslider_showDoubleJqueryError("#rev-slider2");
            } else {
                revapi2 = tpj("#rev-slider2").show().revolution({
                    sliderType: "standard",
                    jsFileLocation: "assets/plugins/rev-slider/js/",
                    sliderLayout: "fullscreen",
                    dottedOverlay: "none",
                    delay: 10000,
                    navigation: {
                        keyboardNavigation: "on",
                        keyboard_direction:  "horizontal",
                        mouseScrollNavigation: "off",
                        onHoverStop: "off",
                        touch: {
                            touchenabled: "on",
                            swipe_threshold:  75,
                            swipe_min_touches:  1,
                            drag_block_vertical:  false,
                            swipe_direction:  "horizontal"
                        },
                        arrows: {
                            style: "metis",
                            enable: true,
                            hide_onmobile: true,
                            hide_under: 768,
                            hide_onleave: false,
                            tmp: '',
                            left: {
                                h_align: "left",
                                v_align: "center",
                                h_offset: 0,
                                v_offset: 0
                            },
                            right: {
                                h_align: "right",
                                v_align: "center",
                                h_offset: 0,
                                v_offset: 0
                            }
                        },
                    },
                    responsiveLevels: [1240,1024,776,480],
                    gridwidth: [1240,1024,776,480],
                    gridheight: [868,768,960,720],
                    lazyType: "smart",
                    shadow: 0,
                    spinner: "off",
                    shuffle: "off",
                    autoHeight: "off",
                    fullScreenAlignForce: "off",
                    fullScreenOffsetContainer: ".rev-slider-offset",
                    hideSliderAtLimit: 0,
                    hideCaptionAtLimit: 0,
                    hideAllCaptionAtLilmit: 0,
                    debugMode: false,
                    fallbacks: {
                        simplifyAll: "off",
                        nextSlideOnWindowFocus: "off",
                        disableFocusListener: false,
                    }
                });
            }
        });
    }

    // Handle Revolution Slider Layout 3
    var handleRevSliderLayout3 = function() {
        var tpj=jQuery;         
        var revapi3;
        tpj(document).ready(function() {
            if(tpj("#rev-slider3").revolution == undefined){
                revslider_showDoubleJqueryError("#rev-slider3");
            } else {
                revapi3 = tpj("#rev-slider3").show().revolution({
                    sliderType: "standard",
                    jsFileLocation: "assets/plugins/rev-slider/js/",
                    sliderLayout: "auto",
                    dottedOverlay: "none",
                    delay: 9000,
                    navigation: {
                        keyboardNavigation: "off",
                        keyboard_direction: "horizontal",
                        mouseScrollNavigation: "off",
                        onHoverStop: "off"
                    },
                    responsiveLevels: [1240,1024,778,480],
                    gridwidth: [1240,1024,778,480],
                    gridheight: [868,768,960,720],
                    lazyType: "smart",
                    shadow: 0,
                    spinner: "on",
                    stopLoop: "off",
                    shuffle: "off",
                    autoHeight: "off",
                    fullScreenOffsetContainer: ".rev-slider-offset",
                    hideThumbsOnMobile: "off",
                    hideSliderAtLimit: 0,
                    hideCaptionAtLimit: 0,
                    hideAllCaptionAtLilmit: 0,
                    debugMode: false,
                    fallbacks: {
                        simplifyAll: "off",
                        nextSlideOnWindowFocus: "off",
                        disableFocusListener: false,
                    }
                });
            }
        });
    }

    // Handle Revolution Slider Layout 4
    var handleRevSliderLayout4 = function() {
        var tpj=jQuery,         
        revapi4;
        tpj(document).ready(function() {
            if(tpj("#rev-slider4").revolution == undefined){
                revslider_showDoubleJqueryError("#rev-slider4");
            } else {
                revapi4 = tpj("#rev-slider4").show().revolution({
                    sliderType: "standard",
                    jsFileLocation: "assets/plugins/rev-slider/js/",
                    sliderLayout: "fullscreen",
                    dottedOverlay: "none",
                    delay: 9000,
                    navigation: {
                        keyboardNavigation:"on",
                        keyboard_direction: "horizontal",
                        mouseScrollNavigation:"off",
                        onHoverStop:"off",
                        touch:{
                            touchenabled:"on",
                            swipe_threshold: 75,
                            swipe_min_touches: 1,
                            swipe_direction: "horizontal",
                            drag_block_vertical: false
                        },
                        bullets: {
                            enable: true,
                            hide_onmobile: true,
                            hide_under: 600,
                            style: "hermes",
                            hide_onleave: true,
                            hide_delay: 200,
                            hide_delay_mobile: 1200,
                            direction: "vertical",
                            h_align: "right",
                            v_align: "center",
                            h_offset: 30,
                            v_offset: 0,
                            space: 5,
                            tmp: ''
                        }
                    },
                    responsiveLevels: [1240,1024,778,480],
                    gridwidth: [1240,1024,778,480],
                    gridheight: [868,768,960,720],
                    lazyType: "smart",
                    shadow: 0,
                    spinner: "off",
                    stopLoop: "on",
                    shuffle: "off",
                    autoHeight: "off",
                    disableProgressBar: "on",
                    hideThumbsOnMobile: "off",
                    hideSliderAtLimit: 0,
                    hideCaptionAtLimit: 0,
                    hideAllCaptionAtLilmit: 0,
                    debugMode: false,
                    fallbacks: {
                        simplifyAll: "off",
                        nextSlideOnWindowFocus: "off",
                        disableFocusListener: false,
                    }
                });
            }
        });
    }

    // Handle Revolution Slider Layout 5
    var handleRevSliderLayout5 = function() {
        var tpj=jQuery,         
        revapi5;
        tpj(document).ready(function() {
            if(tpj("#rev-slider5").revolution == undefined){
                revslider_showDoubleJqueryError("#rev-slider5");
            } else {
                revapi5 = tpj("#rev-slider5").show().revolution({
                    sliderType: "standard",
                    jsFileLocation: "assets/plugins/rev-slider/js/",
                    sliderLayout: "fullscreen",
                    dottedOverlay: "none",
                    delay: 9000,
                    navigation: {
                        keyboardNavigation: "off",
                        keyboard_direction: "horizontal",
                        mouseScrollNavigation: "off",
                        onHoverStop: "off",
                        bullets: {
                            enable: true,
                            hide_onmobile: true,
                            hide_under: 992,
                            style: "zeus",
                            hide_onleave: false,
                            direction: "horizontal",
                            h_align: "left",
                            v_align: "bottom",
                            h_offset: 80,
                            v_offset: 105,
                            space: 5,
                            tmp: '<span class="tp-bullet-image"></span><span class="tp-bullet-imageoverlay"></span><span class="tp-bullet-title">{{title}}</span>'
                        }
                    },
                    responsiveLevels: [1240,1024,778,480],
                    gridwidth: [1240,1024,778,480],
                    gridheight: [868,768,960,720],
                    lazyType: "smart",
                    shadow: 0,
                    spinner: "off",
                    stopLoop: "off",
                    stopAfterLoops: -1,
                    stopAtSlide: -1,
                    shuffle: "off",
                    autoHeight: "off",
                    fullScreenOffsetContainer: ".rev-slider-offset",
                    hideThumbsOnMobile: "off",
                    hideSliderAtLimit: 0,
                    hideCaptionAtLimit: 0,
                    hideAllCaptionAtLilmit: 0,
                    debugMode: false,
                    fallbacks: {
                        simplifyAll: "off",
                        nextSlideOnWindowFocus: "off",
                        disableFocusListener: false,
                    }
                });
            }
        });
    }

    // Handle Revolution Slider Layout 6
    var handleRevSliderLayout6 = function() {
        var tpj=jQuery;
        var revapi6;
        tpj(document).ready(function() {
            if(tpj("#rev-slider6").revolution == undefined){
                revslider_showDoubleJqueryError("#rev-slider6");
            } else {
                revapi6 = tpj("#rev-slider6").show().revolution({
                    sliderType: "standard",
                    jsFileLocation: "assets/plugins/rev-slider/js/",
                    sliderLayout: "fullscreen",
                    dottedOverlay: "none",
                    delay: 9000,
                    navigation: {
                        keyboardNavigation: "on",
                        keyboard_direction: "horizontal",
                        mouseScrollNavigation: "on",
                        onHoverStop: "off",
                        touch: {
                            touchenabled: "on",
                            swipe_threshold: 75,
                            swipe_min_touches: 1,
                            swipe_direction: "vertical",
                            drag_block_vertical: false
                        },
                        bullets: {
                            enable: true,
                            hide_onmobile: false,
                            style: "uranus",
                            hide_onleave: false,
                            direction: "vertical",
                            h_align: "left",
                            v_align: "center",
                            h_offset: 30,
                            v_offset: 0,
                            space: 5,
                            tmp: '<span class="tp-bullet-inner"></span>'
                        }
                    },
                    responsiveLevels: [1240,1024,778,480],
                    gridwidth: [1240,1024,778,480],
                    gridheight: [868,768,960,720],
                    lazyType: "smart",
                    shadow: 0,
                    spinner: "off",
                    stopLoop: "on",
                    stopAfterLoops: 0,
                    stopAtSlide: 1,
                    shuffle: "off",
                    autoHeight: "off",
                    fullScreenAlignForce: "off",
                    fullScreenOffsetContainer: "",
                    fullScreenOffset: "",
                    disableProgressBar: "on",
                    hideThumbsOnMobile: "off",
                    hideSliderAtLimit: 0,
                    hideCaptionAtLimit: 0,
                    hideAllCaptionAtLilmit: 0,
                    debugMode: false,
                    fallbacks: {
                        simplifyAll: "off",
                        nextSlideOnWindowFocus: "off",
                        disableFocusListener: false,
                    }
                });
            }
        });
    }

    // Handle Revolution Slider Layout 7
    var handleRevSliderLayout7 = function() {
        var tpj=jQuery;             
        var revapi7;
        tpj(document).ready(function() {
            if(tpj("#rev-slider7").revolution == undefined){
                revslider_showDoubleJqueryError("#rev-slider7");
            }else{
                revapi7 = tpj("#rev-slider7").show().revolution({
                    sliderType: "hero",
                    jsFileLocation: "assets/plugins/rev-slider/js/",
                    sliderLayout: "fullscreen",
                    dottedOverlay: "none",
                    delay: 9000,
                    responsiveLevels: [1240,1024,778,480],
                    gridwidth: [1240,1024,778,480],
                    gridheight: [868,768,960,720],
                    lazyType: "smart",
                    shadow: 0,
                    spinner: "off",
                    stopLoop: "on",
                    stopAfterLoops: 0,
                    stopAtSlide: 1,
                    shuffle: "off",
                    autoHeight: "off",
                    disableProgressBar: "on",
                    hideThumbsOnMobile: "off",
                    hideSliderAtLimit: 0,
                    hideCaptionAtLimit: 0,
                    hideAllCaptionAtLilmit: 0,
                    debugMode: false,
                    fallbacks: {
                        simplifyAll: "off",
                        nextSlideOnWindowFocus: "off",
                        disableFocusListener: false,
                    }
                });
            }
        });
    }

    // Handle Revolution Slider Layout 8
    var handleRevSliderLayout8 = function() {
        var tpj=jQuery;
        var revapi8;
        tpj(document).ready(function() {
            if(tpj("#rev-slider8").revolution == undefined){
                revslider_showDoubleJqueryError("#rev-slider8");
            }else{
                revapi8 = tpj("#rev-slider8").show().revolution({
                    sliderType: "standard",
                    jsFileLocation: "assets/plugins/rev-slider/js/",
                    sliderLayout: "fullscreen",
                    dottedOverlay: "none",
                    delay: 9000,
                    navigation: {
                        keyboardNavigation: "off",
                        keyboard_direction: "horizontal",
                        mouseScrollNavigation: "off",
                        onHoverStop: "off",
                        bullets: {
                            enable: true,
                            hide_onmobile: true,
                            hide_under: 992,
                            style: "zeus",
                            hide_onleave: false,
                            direction: "horizontal",
                            h_align: "left",
                            v_align: "bottom",
                            h_offset: 80,
                            v_offset: 105,
                            space: 5,
                            tmp: '<span class="tp-bullet-image"></span><span class="tp-bullet-imageoverlay"></span><span class="tp-bullet-title">{{title}}</span>'
                        }
                    },
                    responsiveLevels: [1240,1024,778,480],
                    gridwidth: [1240,1024,778,480],
                    gridheight: [868,768,960,720],
                    lazyType: "smart",
                    shadow: 0,
                    spinner: "off",
                    stopLoop: "off",
                    stopAfterLoops: -1,
                    stopAtSlide: -1,
                    shuffle: "off",
                    autoHeight: "off",
                    hideThumbsOnMobile: "on",
                    hideSliderAtLimit: 0,
                    hideCaptionAtLimit: 0,
                    hideAllCaptionAtLilmit: 0,
                    debugMode: false,
                    fallbacks: {
                        simplifyAll: "off",
                        nextSlideOnWindowFocus: "off",
                        disableFocusListener: false,
                    }
                });
            }
        });
    }

    // Handle Revolution Slider Layout 9
    var handleRevSliderLayout9 = function() {
        var tpj=jQuery,         
        revapi9;
        tpj(document).ready(function() {
            if(tpj("#rev-slider9").revolution == undefined){
                revslider_showDoubleJqueryError("#rev-slider9");
            } else {
                revapi9 = tpj("#rev-slider9").show().revolution({
                    sliderType: "standard",
                    jsFileLocation: "assets/plugins/rev-slider/js/",
                    sliderLayout: "fullscreen",
                    dottedOverlay: "none",
                    delay: 9000,
                    navigation: {
                        keyboardNavigation: "on",
                        keyboard_direction: "horizontal",
                        mouseScrollNavigation: "off",
                        onHoverStop: "off",
                        touch: {
                            touchenabled: "on",
                            swipe_threshold: 75,
                            swipe_min_touches: 1,
                            drag_block_vertical: false,
                            swipe_direction: "horizontal"
                        },
                        bullets: {
                            enable: true,
                            hide_onmobile: true,
                            hide_under: 992,
                            style: "zeus",
                            hide_onleave: false,
                            direction: "horizontal",
                            h_align: "right",
                            v_align: "bottom",
                            h_offset: 80,
                            v_offset: 50,
                            space: 5,
                            tmp: '<span class="tp-bullet-image"></span><span class="tp-bullet-imageoverlay"></span><span class="tp-bullet-title">{{title}}</span>'
                        }
                    },
                    viewPort: {
                        enable:true,
                        outof:"pause",
                        visible_area:"80%"
                    },
                    responsiveLevels: [1240,1024,778,480],
                    gridwidth: [1240,1024,778,480],
                    gridheight: [868,768,960,720],
                    lazyType: "smart",
                    shadow: 0,
                    spinner: "off",
                    stopLoop: "on",
                    shuffle: "off",
                    autoHeight: "off",
                    disableProgressBar: "on",
                    hideThumbsOnMobile: "off",
                    fullScreenOffsetContainer: ".rev-slider-offset",
                    hideSliderAtLimit: 0,
                    hideCaptionAtLimit: 0,
                    hideAllCaptionAtLilmit: 0,
                    debugMode: false,
                    fallbacks: {
                        simplifyAll: "off",
                        nextSlideOnWindowFocus: "off",
                        disableFocusListener: false,
                    }
                });
            }
        });
    }

    // Handle Revolution Slider Layout 10
    var handleRevSliderLayout10 = function() {
        var tpj=jQuery;                 
        var revap10;
        tpj(document).ready(function() {
            if(tpj("#rev-slider10").revolution == undefined){
                revslider_showDoubleJqueryError("#rev-slider10");
            }else{
                revap10 = tpj("#rev-slider10").show().revolution({
                    sliderType: "standard",
                    jsFileLocation: "assets/plugins/rev-slider/js/",
                    sliderLayout: "fullscreen",
                    dottedOverlay: "none",
                    delay: 9000,
                    navigation: {
                        keyboardNavigation: "on",
                        keyboard_direction:  "horizontal",
                        mouseScrollNavigation: "off",
                        onHoverStop: "on",
                        touch: {
                            touchenabled: "on",
                            swipe_threshold:  75,
                            swipe_min_touches:  1,
                            swipe_direction:  "horizontal",
                            drag_block_vertical:  false
                        }
                        ,
                        arrows: {
                            style: "gyges",
                            enable: true,
                            hide_onmobile: false,
                            hide_over: 778,
                            hide_onleave: false,
                            tmp: '',
                            left: {
                                h_align: "right",
                                v_align: "bottom",
                                h_offset: 40,
                                v_offset: 0
                            },
                            right: {
                                h_align: "right",
                                v_align: "bottom",
                                h_offset: 0,
                                v_offset: 0
                            }
                        }
                        ,
                        tabs: {
                            style: "erinyen",
                            enable: true,
                            width: 220,
                            height: 100,
                            min_width: 220,
                            wrapper_padding: 0,
                            wrapper_color: "transparent",
                            wrapper_opacity: "0",
                            tmp: '<div class="theme-rev-tab-title-v1">{{title}}</div><div class="theme-rev-tab-desc-v1">{{description}}</div>',
                            visibleAmount:  3,
                            hide_onmobile:  true,
                            hide_under: 778,
                            hide_onleave: false,
                            hide_delay: 200,
                            direction: "horizontal",
                            span: false,
                            position: "inner",
                            space: 20,
                            h_align: "center",
                            v_align: "bottom",
                            h_offset: 30,
                            v_offset: 0
                        }
                    },
                    viewPort: {
                        enable: true,
                        outof: "pause",
                        visible_area: "80%"
                    },
                    responsiveLevels: [1240,1024,778,480],
                    gridwidth: [1240,1024,778,480],
                    gridheight: [500,450,400,350],
                    lazyType: "smart",
                    parallax: {
                        type: "scroll",
                        origo: "enterpoint",
                        speed: 400,
                        levels: [5,10,15,20,25,30,35,40,45,50],
                    },
                    shadow: 0,
                    spinner: "off",
                    stopLoop: "off",
                    stopAfterLoops: -1,
                    stopAtSlide: -1,
                    shuffle: "off",
                    autoHeight: "off",
                    fullScreenOffsetContainer: ".rev-slider-offset",
                    hideThumbsOnMobile: "off",
                    hideSliderAtLimit: 0,
                    hideCaptionAtLimit: 0,
                    hideAllCaptionAtLilmit: 0,
                    debugMode: false,
                    fallbacks: {
                        simplifyAll: "off",
                        nextSlideOnWindowFocus: "off",
                        disableFocusListener: false,
                    }
                });
            }
        });
    }

    // Handle Revolution Slider Layout 11
    var handleRevSliderLayout11 = function() {
        var tpj=jQuery,         
        revapi11;
        tpj(document).ready(function() {
            if(tpj("#rev-slider11").revolution == undefined){
                revslider_showDoubleJqueryError("#rev-slider11");
            } else {
                revapi11 = tpj("#rev-slider11").show().revolution({
                    sliderType: "hero",
                    jsFileLocation: "assets/plugins/rev-slider/js/",
                    sliderLayout: "fullscreen",
                    dottedOverlay: "none",
                    delay: 9000,
                    navigation: {
                    },
                    viewPort: {
                        enable: true,
                        outof: "pause",
                        visible_area: "80%"
                    },
                    responsiveLevels: [1240,1024,778,480],
                    gridwidth: [1240,1024,778,480],
                    gridheight: [500,450,400,350],
                    lazyType: "smart",
                    shadow: 0,
                    spinner: "off",
                    autoHeight: "off",
                    disableProgressBar: "on",
                    hideThumbsOnMobile: "off",
                    hideSliderAtLimit: 0,
                    hideCaptionAtLimit: 0,
                    hideAllCaptionAtLilmit: 0,
                    debugMode: false,
                    fallbacks: {
                        simplifyAll: "off",
                        disableFocusListener: false,
                    }
                });
            }
        });
    }

    return {
        init: function() {
            handleRevSliderLayout1(); // initial setup for revolution slider layout 1
            handleRevSliderLayout2(); // initial setup for revolution slider layout 2
            handleRevSliderLayout3(); // initial setup for revolution slider layout 3
            handleRevSliderLayout4(); // initial setup for revolution slider layout 4
            handleRevSliderLayout5(); // initial setup for revolution slider layout 5
            handleRevSliderLayout6(); // initial setup for revolution slider layout 6
            handleRevSliderLayout7(); // initial setup for revolution slider layout 7
            handleRevSliderLayout8(); // initial setup for revolution slider layout 8
            handleRevSliderLayout9(); // initial setup for revolution slider layout 9
            handleRevSliderLayout10(); // initial setup for revolution slider layout 10
            handleRevSliderLayout11(); // initial setup for revolution slider layout 11
        }
    }
}();

$(document).ready(function() {
    RevSlider.init();
});
