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
    @include('layouts.partials.category')
    @section('promo')
    <div class="promo-block-v2 fullheight text-center">
        <div class="container vertical-center-aligned">
            <h1 class="promo-block-v2-title wow fadeInUp" data-wow-duration="1.5s" data-wow-delay=".2s">Welcome To iWanli's Blog</h1>
            <p class="promo-block-v2-text margin-b-50 wow fadeInUp" data-wow-duration="1.5s" data-wow-delay=".5s">
                I am a slow walker, but I never walk backwards...
            </p>
            <div class="scroll-to-section-v1 wow fadeInUp pull-right" data-wow-duration="1.5s" data-wow-delay="1.5s">
                <a href="#scroll_page">
                    <i class="scroll-to-section-click-icon fa fa-angle-double-down"></i>
                </a>
            </div>
        </div>
    </div>
    <div class="bg-color-sky-light">
        <div class="container-sm">
            <div class="bg-color-white border-1 padding-40 margin-t-o-80">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="heading-v1 margin-b-20 text-center">
                            <h2 class="heading-v1-title">{{$settings['about_en_title']}}</h2>
                            <span class="heading-v1-subtitle">{{$settings['about_title']}}</span>
                        </div>
                        {!! $settings['about_content'] !!}
                    </div>
                </div>
            </div>
            <div class="content"></div>
        </div>
    </div>
    <div class="bg-color-white">
        <div class="content-md container" id="scroll_page">
            <div class="heading-v3 text-center">
                <h2 class="heading-v3-title">Great Diary</h2>
                <div class="divider-v2"><div class="divider-v2-element"><i class="divider-v2-icon fa fa-paper-plane-o"></i></div></div>
                <p class="heading-v3-text">It's the small details that will make a big difference</p>
            </div>
        </div>
    </div>
    @show
    <div class="bg-color-sky-light">
        <div class="content-md container">
            <div class="row">
                <div class="col-xs-12 col-md-9 no-space">
                    @yield('content')
                </div>
                <div class="col-xs-12 col-md-3">
                @section('sidebar')
                    <div class="blog-sidebar margin-b-30">
                        <div class="blog-sidebar-heading">
                            <i class="blog-sidebar-heading-icon fa fa-fire"></i>
                            <h4 class="blog-sidebar-heading-title">热门文章</h4>
                        </div>
                        <div class="blog-sidebar-content scrollbar">
                            <ul class="timeline-v2">
                                <li class="timeline-v2-list-item">
                                    <i class="timeline-v2-badge-icon radius-circle fa fa-calendar"></i>
                                    <small class="timeline-v2-news-date">2016-07-14 11:52:08</small>
                                    <h5 class="timeline-v2-news-title"><a href="#!">Laravel视频教程专题【2016/11/29第33节】</a></h5>
                                </li>
                                <li class="timeline-v2-list-item">
                                    <i class="timeline-v2-badge-icon radius-circle fa fa-calendar"></i>
                                    <small class="timeline-v2-news-date">2016-09-07 14:02:48</small>
                                    <h5 class="timeline-v2-news-title"><a href="#!">Laravel5.3多用户表登录</a></h5>
                                </li>
                                <li class="timeline-v2-list-item">
                                    <i class="timeline-v2-badge-icon radius-circle fa fa-calendar"></i>
                                    <small class="timeline-v2-news-date">2016-05-23 09:14:57</small>
                                    <h5 class="timeline-v2-news-title"><a href="#!">laravel5分页Pagination及扩展</a></h5>
                                </li>
                                <li class="timeline-v2-list-item">
                                    <i class="timeline-v2-badge-icon radius-circle fa fa-calendar"></i>
                                    <small class="timeline-v2-news-date">2016-05-26 05:23:30</small>
                                    <h5 class="timeline-v2-news-title"><a href="#!">Laravel5使用Captcha扩展包生成验证码</a></h5>
                                </li>
                                <li class="timeline-v2-list-item">
                                    <i class="timeline-v2-badge-icon radius-circle fa fa-calendar"></i>
                                    <small class="timeline-v2-news-date">2016-08-16 12:48:43</small>
                                    <h5 class="timeline-v2-news-title"><a href="#!">Laravel5.2中多用户表登录</a></h5>
                                </li>
                                <li class="timeline-v2-list-item">
                                    <i class="timeline-v2-badge-icon radius-circle fa fa-calendar"></i>
                                    <small class="timeline-v2-news-date">2016-12-01 10:28:18</small>
                                    <h5 class="timeline-v2-news-title"><a href="#!">Laravel5.3&amp;Vue2.0系列【2016.12.7 第5节】</a></h5>
                                </li>
                                <li class="timeline-v2-list-item">
                                    <i class="timeline-v2-badge-icon radius-circle fa fa-calendar"></i>
                                    <small class="timeline-v2-news-date">2016-05-25 05:34:44</small>
                                    <h5 class="timeline-v2-news-title"><a href="#!">Laravel5 自定义登录字段</a></h5>
                                </li>
                                <li class="timeline-v2-list-item">
                                    <i class="timeline-v2-badge-icon radius-circle fa fa-calendar"></i>
                                    <small class="timeline-v2-news-date">2016-07-04 09:23:24</small>
                                    <h5 class="timeline-v2-news-title"><a href="#!">01-Laravel5.2视频教程之简介</a></h5>
                                </li>
                                <li class="timeline-v2-list-item">
                                    <i class="timeline-v2-badge-icon radius-circle fa fa-calendar"></i>
                                    <small class="timeline-v2-news-date">2016-07-15 12:45:13</small>
                                    <h5 class="timeline-v2-news-title"><a href="#!">07-Laravel5.2视频教程之Entrust安装</a></h5>
                                </li>
                                <li class="timeline-v2-list-item">
                                    <i class="timeline-v2-badge-icon radius-circle fa fa-calendar"></i>
                                    <small class="timeline-v2-news-date">2016-06-12 22:36:04</small>
                                    <h5 class="timeline-v2-news-title"><a href="#!">Laravel自定义错误页面</a></h5>
                                </li>
                                <li class="clearfix" style="float: none;"></li>
                            </ul>
                        </div>
                    </div>
                    @include('layouts.partials.link')
                @show
                </div>
            </div>
        </div>
    </div>
    @yield('paginate')

    @include('layouts.partials.footer')
    
</div>
<a href="javascript:void(0);" class="js-back-to-top back-to-top-theme"></a>

<!--[if lt IE 9]>
<script src="/js/html5shiv.js"></script>
<script src="/js/respond.min.js"></script>
<![endif]-->
<script type="text/javascript" src="{{ elixir('js/all.js') }}"></script>
<script type="text/javascript" src="{{ elixir('js/app.js') }}"></script>
@yield('js')
</body>
</html>