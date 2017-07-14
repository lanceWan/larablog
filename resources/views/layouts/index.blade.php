<!DOCTYPE html>
<html lang="en" class="no-js">
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
<div class="wrapper">
    <header class="header-transparent header-transparent navbar-fixed-top header-sticky">
        <nav class="navbar mega-menu" role="navigation">
            <div class="container">
                <div class="menu-container">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".nav-collapse">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="toggle-icon"></span>
                    </button>

                    <div class="navbar-logo">
                        <a class="navbar-logo-wrap" href="/">
                            <img class="navbar-logo-img navbar-logo-img-white" src="{{asset('image/logo-white.png')}}" alt="Ark">
                            <img class="navbar-logo-img navbar-logo-img-dark" src="{{asset('image/logo-dark.png')}}" alt="Ark">
                        </a>
                    </div>
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
                                <a class="nav-item-child radius-3" href="http://coding.iwanli.me">
                                    学院
                                </a>
                            </li>

                            <li class="nav-item">
                                <a class="nav-item-child radius-3" href="javascript:void(0);">
                                    关于我(Comming)
                                </a>
                            </li>

                            <li class="nav-item">
                                <a class="nav-item-child radius-3" target="_blank" href="https://github.com/lanceWan">
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
                <li class="promo-block-v11-category-item wow bounceIn" data-wow-duration=".2" data-wow-delay=".4s">
                    <a class="promo-block-v11-category-link radius-3" href="http://blog.iwanli.me">
                        <i class="promo-block-v11-category-icon fa fa-paper-plane"></i>
                        Blog
                    </a>
                </li>
                <li class="promo-block-v11-category-item wow bounceIn" data-wow-duration=".2" data-wow-delay=".6s">
                    <a class="promo-block-v11-category-link radius-3" href="http://coding.iwanli.me">
                        <i class="promo-block-v11-category-icon fa fa-free-code-camp"></i>
                        Laravel
                    </a>
                </li>
                <li class="promo-block-v11-category-item wow bounceIn" data-wow-duration=".2" data-wow-delay=".8s">
                    <a class="promo-block-v11-category-link radius-3" href="#">
                        <i class="promo-block-v11-category-icon fa fa-vcard"></i>
                        Me
                    </a>
                </li>
                <li class="promo-block-v11-category-item wow bounceIn" data-wow-duration=".2" data-wow-delay="1s">
                    <a class="promo-block-v11-category-link radius-3" target="_blank" href="https://github.com/lanceWan">
                        <i class="promo-block-v11-category-icon fa fa-github"></i>
                        Github
                    </a>
                </li>
            </ul>
        </div>
    </section> 
</div>

<!--[if lt IE 9]>
<script src="/js/html5shiv.js"></script>
<script src="/js/respond.min.js"></script>
<![endif]-->
<script type="text/javascript" src="{{ elixir('js/all.js') }}"></script>
<script type="text/javascript" src="{{ elixir('js/app.js') }}"></script>
</body>
</html>