// Owl Carousel
var OwlCarousel = function() {
    "use strict";

    // Handle Owl Carousel Testimonials One Item
    var handleTestimonialsOneItem = function() {
        $(document).ready(function() {
            var owl = $(".owl-carousel-testimonials-one-item");
            owl.owlCarousel({
                items: 1,
                loop: true,
                dots: true,
                nav: false,
                margin: 30,
                autoplay: true,
                smartSpeed: 450,
                autoplaySpeed: 1000
            });
        });
    }

    // Handle Owl Carousel Testimonials Three Item
    var handleTestimonialsThreeItem = function() {
        $(document).ready(function() {
            var owl = $(".owl-carousel-testimonials-three-item");
            owl.owlCarousel({
                items: 3,
                loop: true,
                dots: false,
                nav: true,
                navText: ['', ''],
                navContainer: '.owl-controls-testimonials-three-item',
                margin: 30,
                autoplay: true,
                smartSpeed: 450,
                autoplaySpeed: 1000,
                responsive: {
                    // breakpoint from 0 up
                    0: {
                        items: 1
                    },
                    // breakpoint from 480 up
                    480: {
                        items: 1
                    },
                    // breakpoint from 550 up
                    550: {
                        items: 1
                    },
                    // breakpoint from 768 up
                    768: {
                        items: 2
                    },
                    // breakpoint from 992 up
                    992: {
                        items: 3
                    },
                    // breakpoint from 1199 up
                    1199: {
                        items: 3
                    }
                }
            });

            // Custom Navigation Events
            $('.owl-controls-testimonials-three-item-next').on('click', function() {
                owl.trigger('next.owl.carousel');
            })
            $('.owl-controls-testimonials-three-item-prev').on('click', function() {
                owl.trigger('prev.owl.carousel', [300]);
            })
        });
    }

    // Handle Owl Carousel Team v1
    var handleTeamV1 = function() {
        $(document).ready(function() {
            var owl = $(".owl-carousel-team-v1");
            owl.owlCarousel({
                items: 3,
                loop: true,
                dots: false,
                nav: true,
                navText: ['', ''],
                navContainer: '.owl-controls-team-v1',
                margin: 30,
                autoplay: true,
                smartSpeed: 450,
                autoplaySpeed: 1000,
                responsive: {
                    // breakpoint from 0 up
                    0: {
                        items: 1
                    },
                    // breakpoint from 480 up
                    480: {
                        items: 1
                    },
                    // breakpoint from 550 up
                    550: {
                        items: 1
                    },
                    // breakpoint from 768 up
                    768: {
                        items: 2
                    },
                    // breakpoint from 992 up
                    992: {
                        items: 3
                    },
                    // breakpoint from 1199 up
                    1199: {
                        items: 3
                    }
                }
            });

            // Custom Navigation Events
            $('.owl-controls-team-v1-next').on('click', function() {
                owl.trigger('next.owl.carousel');
            })
            $('.owl-controls-team-v1-prev').on('click', function() {
                owl.trigger('prev.owl.carousel', [300]);
            })
        });
    }

    // Handle Owl Carousel Testimonials v4
    var handleTestimonialsV4 = function() {
        $(document).ready(function() {
            var owl = $(".owl-carousel-testimonials-v4");
            owl.owlCarousel({
                items: 1,
                loop: true,
                dots: true,
                nav: false,
                margin: 30,
                autoplay: true,
                smartSpeed: 450,
                autoplaySpeed: 1000,
                animateIn: 'fadeIn',
                animateOut: 'fadeOut',
                dotsContainer: '.owl-nav-testimonials-v4'
            });
        });
    }

    // Handle Owl Carousel Clients Five Item
    var handleClientsFiveItem = function() {
        $(document).ready(function() {
            var owl = $(".owl-carousel-clients-five-item");
            owl.owlCarousel({
                items: 5,
                loop: true,
                dots: false,
                nav: false,
                margin: 20,
                autoplay: true,
                smartSpeed: 450,
                autoplaySpeed: 1000,
                responsive: {
                    // breakpoint from 0 up
                    0: {
                        items: 2
                    },
                    // breakpoint from 480 up
                    480: {
                        items: 3
                    },
                    // breakpoint from 550 up
                    550: {
                        items: 4
                    },
                    // breakpoint from 768 up
                    768: {
                        items: 5
                    },
                    // breakpoint from 992 up
                    992: {
                        items: 4
                    },
                    // breakpoint from 1199 up
                    1199: {
                        items: 5
                    }
                }
            });
        });
    }

    // Handle Owl Carousel Clients Six Item
    var handleClientsSixItem = function() {
        $(document).ready(function() {
            var owl = $(".owl-carousel-clients-six-item");
            owl.owlCarousel({
                items: 6,
                loop: true,
                dots: false,
                nav: false,
                margin: 20,
                autoplay: true,
                smartSpeed: 450,
                autoplaySpeed: 1000,
                responsive: {
                    // breakpoint from 0 up
                    0: {
                        items: 2
                    },
                    // breakpoint from 480 up
                    480: {
                        items: 3
                    },
                    // breakpoint from 550 up
                    550: {
                        items: 4
                    },
                    // breakpoint from 768 up
                    768: {
                        items: 4
                    },
                    // breakpoint from 992 up
                    992: {
                        items: 5
                    },
                    // breakpoint from 1199 up
                    1199: {
                        items: 6
                    }
                }
            });
        });
    }

    // Handle Owl Carousel Blog Grid Thumb
    var handleBlogGridThumb = function() {
        $(document).ready(function() {
            var owl = $(".owl-carousel-blog-grid-thumb");
            owl.owlCarousel({
                items: 5,
                loop: true,
                dots: false,
                nav: false,
                autoplay: true,
                smartSpeed: 450,
                autoplaySpeed: 1000,
                responsive: {
                    // breakpoint from 0 up
                    0: {
                        items: 2
                    },
                    // breakpoint from 480 up
                    480: {
                        items: 2
                    },
                    // breakpoint from 550 up
                    550: {
                        items: 2
                    },
                    // breakpoint from 768 up
                    768: {
                        items: 3
                    },
                    // breakpoint from 992 up
                    992: {
                        items: 4
                    },
                    // breakpoint from 1199 up
                    1199: {
                        items: 5
                    }
                }
            });
        });
    }

    // Handle Owl Carousel One Item
    var handleOneItem = function() {
        $(document).ready(function() {
            var owl = $(".owl-carousel-one-item");
            owl.owlCarousel({
                items: 1,
                loop: true,
                dots: true,
                nav: false,
                smartSpeed: 450
            });
        });
    }

    // Handle Owl Carousel Four Item
    var fandleFourItem = function() {
        $(document).ready(function() {
            var owl = $(".owl-carousel-four-item");
            owl.owlCarousel({
                items: 4,
                loop: true,
                dots: false,
                nav: true,
                navText: ['', ''],
                navContainer: '.owl-controls-four-item',
                margin: 20,
                autoplay: true,
                smartSpeed: 450,
                autoplaySpeed: 1000,
                responsive: {
                    // breakpoint from 0 up
                    0: {
                        items: 1
                    },
                    // breakpoint from 480 up
                    480: {
                        items: 1
                    },
                    // breakpoint from 550 up
                    550: {
                        items: 1
                    },
                    // breakpoint from 768 up
                    768: {
                        items: 2
                    },
                    // breakpoint from 992 up
                    992: {
                        items: 3
                    },
                    // breakpoint from 1199 up
                    1199: {
                        items: 4
                    }
                }
            });

            // Custom Navigation Events
            $('.owl-controls-four-item-next').on('click', function() {
                owl.trigger('next.owl.carousel');
            })
            $('.owl-controls-four-item-prev').on('click', function() {
                owl.trigger('prev.owl.carousel', [300]);
            })
        });
    }

    // Handle Owl Carousel Mockup Slider v1
    var handleMockupSliderV1 = function() {
        $(document).ready(function() {
            var owl = $(".owl-carousel-mockup-slider-v1");
            owl.owlCarousel({
                items: 1,
                dots: true,
                nav: false,
                mouseDrag: false,
                touchDrag: false,
                pullDrag: false,
                smartSpeed: 250,
                animateIn: 'fadeIn',
                animateOut: 'fadeOut',
                dotsContainer: '.owl-nav-mockup-slider-v1'
            });
        });
    }

    // Handle Owl Carousel News v12
    var handleNewsV12 = function() {
        $(document).ready(function() {
            var owl = $(".owl-carousel-news-v12");
            owl.owlCarousel({
                items: 3,
                loop: true,
                dots: true,
                nav: false,
                margin: 30,
                autoplay: false,
                smartSpeed: 450,
                responsive: {
                    // breakpoint from 0 up
                    0: {
                        items: 1
                    },
                    // breakpoint from 480 up
                    480: {
                        items: 1
                    },
                    // breakpoint from 550 up
                    550: {
                        items: 1
                    },
                    // breakpoint from 768 up
                    768: {
                        items: 2
                    },
                    // breakpoint from 992 up
                    992: {
                        items: 3
                    },
                    // breakpoint from 1199 up
                    1199: {
                        items: 3
                    }
                }
            });
        });
    }

    // Handle Owl Carousel Team v12
    var handleTeamV12 = function() {
        $(document).ready(function() {
            var owl = $(".owl-carousel-team-v12");
            owl.owlCarousel({
                items: 3,
                loop: true,
                dots: false,
                nav: false,
                margin: 30,
                autoplay: false,
                autoplay: true,
                smartSpeed: 450,
                autoplaySpeed: 1000,
                responsive: {
                    // breakpoint from 0 up
                    0: {
                        items: 1
                    },
                    // breakpoint from 480 up
                    480: {
                        items: 1
                    },
                    // breakpoint from 550 up
                    600: {
                        items: 2
                    },
                    // breakpoint from 768 up
                    768: {
                        items: 2
                    },
                    // breakpoint from 992 up
                    992: {
                        items: 3
                    },
                    // breakpoint from 1199 up
                    1199: {
                        items: 3
                    }
                }
            });
        });
    }

    return {
        init: function() {
            handleTestimonialsOneItem(); // initial setup for testimonials one item
            handleTestimonialsThreeItem(); // initial setup for testimonials three item
            handleTeamV1(); // initial setup for team v1
            handleTestimonialsV4(); // initial setup for testimonials v4
            handleClientsFiveItem(); // initial setup for clients five item
            handleClientsSixItem(); // initial setup for clients six item
            handleBlogGridThumb(); // initial setup for blog grid thumb
            handleOneItem(); // initial setup for one item
            fandleFourItem(); // initial setup for four item
            handleMockupSliderV1(); // initial setup for mockup slider v1
            handleNewsV12(); // initial setup for news v12
            handleTeamV12(); // initial setup for team v12
        }
    }
}();

$(document).ready(function() {
    OwlCarousel.init();
});
