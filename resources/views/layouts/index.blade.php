<!DOCTYPE html>
<html lang="en" class="no-js">
<!-- HEAD -->
<head>
<meta charset="utf-8"/>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>{{$settings['title']}}</title>
<meta name="keywords" content="{{$settings['keywords']}}" />
<meta name="description" content="{{$settings['description']}}">
<meta name="author" content="{{$settings['author']}}">

<meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">

<link href="{{ elixir('css/all.css') }}" rel="stylesheet" type="text/css"/>
<link href="{{ elixir('css/app.css') }}" rel="stylesheet" type="text/css"/>

<link rel="shortcut icon" href="{{asset('image/favicon.ico')}}"/>
</head>
<body class="animsition">
<div class="snow-container"></div>
<div class="wrapper">
    <header class="header-transparent header-transparent navbar-fixed-top header-sticky">
        <!-- Search Field -->
        <div class="search-field">
            <div class="container">
                <input type="text" class="form-control search-field-input" placeholder="Search for...">
            </div>
        </div>
        <!-- End Search Field -->

        <!-- Navbar -->
        <nav class="navbar mega-menu" role="navigation">
            <div class="container">
                <!-- Brand and toggle get grouped for better mobile display -->
                <div class="menu-container">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".nav-collapse">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="toggle-icon"></span>
                    </button>

                    <!-- Logo -->
                    <div class="navbar-logo">
                        <a class="navbar-logo-wrap" href="index.html">
                            <img class="navbar-logo-img navbar-logo-img-white" src="{{asset('image/logo-white.png')}}" alt="Ark">
                            <img class="navbar-logo-img navbar-logo-img-dark" src="{{asset('image/logo-dark.png')}}" alt="Ark">
                        </a>
                    </div>
                    <!-- End Logo -->
                </div>

                <div class="collapse navbar-collapse nav-collapse">
                    <div class="menu-container">
                        <ul class="nav navbar-nav">
                            <li class="nav-item">
                                <a class="nav-item-child radius-3" href="/">
                                    Home
                                </a>
                            </li>

                            <li class="nav-item">
                                <a class="nav-item-child radius-3" href="http://blog.iwanli.me">
                                    博客
                                </a>
                            </li>

                            <li class="nav-item">
                                <a class="nav-item-child radius-3" href="javascript:void(0);">
                                    学院(Comming)
                                </a>
                            </li>

                            <li class="nav-item">
                                <a class="nav-item-child radius-3" href="javascript:void(0);">
                                    关于我(Comming)
                                </a>
                            </li>

                            <li class="nav-item">
                                <a class="nav-item-child radius-3" target="_black" href="https://github.com/lanceWan">
                                    Github
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- End Navbar Collapse -->
            </div>
            <!--// End Container-->
        </nav>
        <!-- Navbar -->
    </header>

    <section class="promo-block-v11 fullheight">
        <div class="container vertical-center-aligned">
            <div class="margin-b-30">
                <h1 class="promo-block-v11-title wow fadeInUp" >晚黎</h1>
                <p class="promo-block-v11-subtitle wow fadeInUp" data-wow-duration=".2" data-wow-delay=".2s">I am a slow walker, but I never walk backwards...</p>
            </div>

            <ul class="list-inline promo-block-v11-category">
                <li class="promo-block-v11-category-item wow fadeInUp" data-wow-duration=".2" data-wow-delay=".4s">
                    <a class="promo-block-v11-category-link radius-3" href="http://blog.iwanli.me">
                        <i class="promo-block-v11-category-icon fa fa-paper-plane"></i>
                        Blog
                    </a>
                </li>
                <li class="promo-block-v11-category-item wow fadeInUp" data-wow-duration=".2" data-wow-delay=".6s">
                    <a class="promo-block-v11-category-link radius-3" href="#">
                        <i class="promo-block-v11-category-icon fa fa-free-code-camp"></i>
                        LaraU
                    </a>
                </li>
                <li class="promo-block-v11-category-item wow fadeInUp" data-wow-duration=".2" data-wow-delay=".8s">
                    <a class="promo-block-v11-category-link radius-3" href="#">
                        <i class="promo-block-v11-category-icon fa fa-vcard"></i>
                        Me
                    </a>
                </li>
                <li class="promo-block-v11-category-item wow fadeInUp" data-wow-duration=".2" data-wow-delay="1s">
                    <a class="promo-block-v11-category-link radius-3" target="_black" href="https://github.com/lanceWan">
                        <i class="promo-block-v11-category-icon fa fa-github"></i>
                        Github
                    </a>
                </li>
            </ul>
            <div class="scroll-to-section wow fadeInUp text-center" data-wow-duration="1.5s" data-wow-delay="1.5s">
                <a href="#scroll_page">
                    <i class="scroll-to-section-click-icon fa fa-angle-double-down"></i>
                </a>
            </div>
        </div>
    </section>  

    <div class="bg-color-white overflow-h" id="scroll_page">
        <div class="content-md container">
            <!-- Heading v1 -->
            <div class="heading-v1 text-center">
                <h2 class="heading-v1-title"><span class="text-danger">i</span><span class="text-info">Wanli</span>-走得慢，但不后退...</h2>
                <p class="heading-v1-text">Walk slowly , but do not retreat...</p>
            </div>
            <!-- End Heading v1 -->
            <div class="row padding-tb-80">

                <div class="col-sm-6">
                    <!--Timeline v2 -->
                    <ul class="timeline-v2">
                        <li class="timeline-v2-current-date">
                            <h5 class="timeline-v2-current-day">热门文章</h5>
                            <small class="timeline-v2-current-time">Hot articles</small>
                        </li>
                        <li class="timeline-v2-list-item">
                            <i class="timeline-v2-badge-icon radius-circle fa fa-comments-o"></i>
                            <small class="timeline-v2-news-date">Commented</small>
                            <h5 class="timeline-v2-news-title"><a href="#">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</a></h5>
                        </li>
                        <li class="timeline-v2-list-item">
                            <i class="timeline-v2-badge-icon radius-circle fa fa-comments-o"></i>
                            <small class="timeline-v2-news-date">Commented</small>
                            <h5 class="timeline-v2-news-title"><a href="#">Nunc efficitur auctor felis, et tempus libero commodo non.</a></h5>
                        </li>
                        <li class="timeline-v2-list-item">
                            <i class="timeline-v2-badge-icon radius-circle fa fa-comments-o"></i>
                            <small class="timeline-v2-news-date">Commented</small>
                            <h5 class="timeline-v2-news-title"><a href="#">Phasellus neque eros, finibus quis velit in, fringilla gravida est.</a></h5>
                        </li>
                        <li class="timeline-v2-list-item">
                            <i class="timeline-v2-badge-icon radius-circle fa fa-comments-o"></i>
                            <small class="timeline-v2-news-date">Commented</small>
                            <h5 class="timeline-v2-news-title"><a href="#">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</a></h5>
                        </li>
                        <li class="timeline-v2-list-item">
                            <i class="timeline-v2-badge-icon radius-circle fa fa-comments-o"></i>
                            <small class="timeline-v2-news-date">Commented</small>
                            <h5 class="timeline-v2-news-title"><a href="#">Nunc efficitur auctor felis, et tempus libero commodo non.</a></h5>
                        </li>
                        <li class="timeline-v2-list-item">
                            <i class="timeline-v2-badge-icon radius-circle fa fa-comments-o"></i>
                            <small class="timeline-v2-news-date">Commented</small>
                            <h5 class="timeline-v2-news-title"><a href="#">Phasellus neque eros, finibus quis velit in, fringilla gravida est.</a></h5>
                        </li>
                        <li class="timeline-v2-list-item">
                            <i class="timeline-v2-badge-icon radius-circle fa fa-comments-o"></i>
                            <small class="timeline-v2-news-date">Commented</small>
                            <h5 class="timeline-v2-news-title"><a href="#">Phasellus neque eros, finibus quis velit in, fringilla gravida est.</a></h5>
                        </li>
                        <li class="timeline-v2-list-item">
                            <i class="timeline-v2-badge-icon radius-circle fa fa-comments-o"></i>
                            <small class="timeline-v2-news-date">Commented</small>
                            <h5 class="timeline-v2-news-title"><a href="#">Phasellus neque eros, finibus quis velit in, fringilla gravida est.</a></h5>
                        </li>

                        <li class="clearfix" style="float: none;"></li>
                    </ul>
                    <!-- End Timeline v2 -->
                </div>

                <div class="col-sm-6">
                    <!--Timeline v2 -->
                    <ul class="timeline-v2">
                        <li class="timeline-v2-current-date">
                            <h5 class="timeline-v2-current-day">最新文章</h5>
                            <small class="timeline-v2-current-time">August, 08, 2016</small>
                        </li>
                        <li class="timeline-v2-list-item">
                            <i class="timeline-v2-badge-icon radius-circle fa fa-comments-o"></i>
                            <small class="timeline-v2-news-date">Commented</small>
                            <h5 class="timeline-v2-news-title"><a href="#">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</a></h5>
                        </li>
                        <li class="timeline-v2-list-item">
                            <i class="timeline-v2-badge-icon radius-circle fa fa-comments-o"></i>
                            <small class="timeline-v2-news-date">Commented</small>
                            <h5 class="timeline-v2-news-title"><a href="#">Nunc efficitur auctor felis, et tempus libero commodo non.</a></h5>
                        </li>
                        <li class="timeline-v2-list-item">
                            <i class="timeline-v2-badge-icon radius-circle fa fa-comments-o"></i>
                            <small class="timeline-v2-news-date">Commented</small>
                            <h5 class="timeline-v2-news-title"><a href="#">Phasellus neque eros, finibus quis velit in, fringilla gravida est.</a></h5>
                        </li>
                        <li class="timeline-v2-current-date">
                            <h5 class="timeline-v2-current-day">随笔</h5>
                            <small class="timeline-v2-current-time">August, 07, 2016</small>
                        </li>
                        <li class="timeline-v2-list-item">
                            <i class="timeline-v2-badge-icon radius-circle fa fa-comments-o"></i>
                            <small class="timeline-v2-news-date">Commented</small>
                            <h5 class="timeline-v2-news-title"><a href="#">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</a></h5>
                        </li>
                        <li class="timeline-v2-list-item">
                            <i class="timeline-v2-badge-icon radius-circle fa fa-comments-o"></i>
                            <small class="timeline-v2-news-date">Commented</small>
                            <h5 class="timeline-v2-news-title"><a href="#">Nunc efficitur auctor felis, et tempus libero commodo non.</a></h5>
                        </li>
                        <li class="timeline-v2-list-item">
                            <i class="timeline-v2-badge-icon radius-circle fa fa-comments-o"></i>
                            <small class="timeline-v2-news-date">Commented</small>
                            <h5 class="timeline-v2-news-title"><a href="#">Phasellus neque eros, finibus quis velit in, fringilla gravida est.</a></h5>
                        </li>

                        <li class="clearfix" style="float: none;"></li>
                    </ul>
                    <!-- End Timeline v2 -->
                </div>
            </div>
            <div class="text-center">
                <a href="http://www.iwanli.me" class="btn-base-bg btn-base-sm radius-3">View More</a>
            </div>
        </div>
    </div>

    {{-- <div class="bg-color-grey-light overflow-h">
        <div class="content-md container">
            <!-- Heading v1 -->
            <div class="heading-v1 text-center margin-b-80">
                <h2 class="heading-v1-title"><span class="text-info">Lara</span><span class="text-danger">U</span>-学的不仅仅是技术，更是梦想！</h2>
                <p class="heading-v1-text">Learning is not only technology , but also a dream!</p>
            </div>
            <!-- End Heading v1 -->

            <div class="row space-row-10 margin-b-30">
                <div class="col-md-4 md-margin-b-20">
                    <!-- Services v1 -->
                    <section class="services-v1">
                        <div class="margin-b-30">
                            <div class="services-v1-icon-wrap radius-circle">
                                <img class="services-v1-icon" src="/image/04.png" alt="">
                            </div>
                            <span class="services-v1-subtitle color-base">Time to talk</span>
                            <h3 class="services-v1-title">5 Star Support</h3>
                            <p class="services-v1-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed cursus sapien, vitae fringilla sem. Duis convallis vel nunc at laoreet.</p>
                        </div>
                        <a href="#" class="btn-base-bg btn-base-sm radius-3">Know More</a>
                    </section>
                    <!-- End Services v1 -->
                </div>
                <div class="col-md-4 md-margin-b-20">
                    <!-- Services v1 -->
                    <section class="services-v1">
                        <div class="margin-b-30">
                            <div class="services-v1-icon-wrap radius-circle">
                                <img class="services-v1-icon" src="/image/03.png" alt="">
                            </div>
                            <span class="services-v1-subtitle color-red">We expect excellence</span>
                            <h3 class="services-v1-title">Always something new</h3>
                            <p class="services-v1-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed cursus sapien, vitae fringilla sem. Duis convallis vel nunc at laoreet.</p>
                        </div>
                        <a href="#" class="btn-base-bg btn-base-sm radius-3">Know More</a>
                    </section>
                    <!-- End Services v1 -->
                </div>
                <div class="col-md-4">
                    <!-- Services v1 -->
                    <section class="services-v1">
                        <div class="margin-b-30">
                            <div class="services-v1-icon-wrap radius-circle">
                                <img class="services-v1-icon" src="/image/02.png" alt="">
                            </div>
                            <span class="services-v1-subtitle color-teal">Make for all devices</span>
                            <h3 class="services-v1-title">Fully responsive</h3>
                            <p class="services-v1-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed cursus sapien, vitae fringilla sem. Duis convallis vel nunc at laoreet.</p>
                        </div>
                        <a href="#" class="btn-base-bg btn-base-sm radius-3">Know More</a>
                    </section>
                    <!-- End Services v1 -->
                </div>
            </div>
        </div>
    </div> --}}
{{--     <div class="bg-color-white">
        <div class="content-md container">
            <!-- Heading v1 -->
            <div class="heading-v1 text-center">
                <h2 class="heading-v1-title"><span class="text-danger">S</span><span class="text-info">ponsor</span>-绝对赤裸裸的金钱赞助...</h2>
                <p class="heading-v1-text">
                    如果您认为本网站的教程质量不错，觉得收获很大，不妨小额赞助我一下，让我有动力继续写出高质量的教程。
                </p>
            </div>
            <!-- End Heading v1 -->
        </div>
    </div>
    <div class="bg-color-grey-light">
        <div class="content-md container">
            <div class="row">
                <div class="col-md-4 md-margin-b-30">
                    <!-- Pricing List v4 -->
                    <div class="pricing-list-v4 radius-10">
                        <div class="pricing-list-v4-header">
                            <h4 class="pricing-list-v4-title">Basic</h4>
                            <span class="pricing-list-v4-subtitle">Individual</span>
                        </div>
                        <div class="pricing-list-v4-content">
                            <div class="margin-b-30">
                                <span class="pricing-list-v4-price-sign"><i class="fa fa-dollar"></i></span>
                                <span class="pricing-list-v4-price">7.</span>
                                <span class="pricing-list-v4-subprice">00</span>
                                <span class="pricing-list-v4-price-info">Month</span>
                            </div>
                            <div class="center-block">
                                <button type="button" class="btn-dark-brd btn-base-sm radius-3">Purchase</button>
                            </div>
                        </div>
                    </div>
                    <!-- End Pricing List v4 -->
                </div>
                <div class="col-md-4 md-margin-b-30">
                    <!-- Pricing List v4 -->
                    <div class="pricing-list-v4 radius-10">
                        <div class="pricing-list-v4-header">
                            <h4 class="pricing-list-v4-title">Premium</h4>
                            <span class="pricing-list-v4-subtitle">Business</span>
                        </div>
                        <div class="pricing-list-v4-content">
                            <div class="margin-b-30">
                                <span class="pricing-list-v4-price-sign"><i class="fa fa-dollar"></i></span>
                                <span class="pricing-list-v4-price">15.</span>
                                <span class="pricing-list-v4-subprice">00</span>
                                <span class="pricing-list-v4-price-info">Month</span>
                            </div>
                            <div class="center-block">
                                <button type="button" class="btn-dark-brd btn-base-sm radius-3">Purchase</button>
                            </div>
                        </div>
                    </div>
                    <!-- End Pricing List v4 -->
                </div>
                <div class="col-md-4 md-margin-b-30">
                    <!-- Pricing List v4 -->
                    <div class="pricing-list-v4 radius-10">
                        <div class="pricing-list-v4-header">
                            <h4 class="pricing-list-v4-title">Ultimate</h4>
                            <span class="pricing-list-v4-subtitle">Enterprise</span>
                        </div>
                        <div class="pricing-list-v4-content">
                            <div class="margin-b-30">
                                <span class="pricing-list-v4-price-sign"><i class="fa fa-dollar"></i></span>
                                <span class="pricing-list-v4-price">23.</span>
                                <span class="pricing-list-v4-subprice">00</span>
                                <span class="pricing-list-v4-price-info">Month</span>
                            </div>
                            <div class="center-block">
                                <button type="button" class="btn-dark-brd btn-base-sm radius-3">Purchase</button>
                            </div>
                        </div>
                    </div>
                    <!-- End Pricing List v4 -->
                </div>
            </div>
            <!--// end row -->
        </div>
    </div> --}}
</div>
@include('layouts.partials.footer')
<a href="javascript:void(0);" class="js-back-to-top back-to-top-theme"></a>

<!--[if lt IE 9]>
<script src="/js/html5shiv.js"></script>
<script src="/js/respond.min.js"></script>
<![endif]-->
<script type="text/javascript" src="{{ elixir('js/all.js') }}"></script>
<script type="text/javascript" src="{{ elixir('js/app.js') }}"></script>
<script type="text/javascript" src="{{ elixir('js/snow.js') }}"></script>
</body>
</html>