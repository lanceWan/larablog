<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
<meta charset="utf-8"/>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
@section('meta')
<title>{{$settings['title']}}</title>
<meta name="keywords" content="{{$settings['keywords']}}" />
<meta name="description" content="{{$settings['description']}}">
<meta name="author" content="{{$settings['author']}}">
@show
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
        <div class="content-md container" id="scroll">
            <div class="heading-v3 text-center">
                <h2 class="heading-v3-title">Great Diary</h2>
                <div class="divider-v2"><div class="divider-v2-element"><i class="divider-v2-icon fa fa-paper-plane-o"></i></div></div>
                <p class="heading-v3-text">It's the small details that will make a big difference</p>
            </div>
        </div>
    </div>
    @show
    <div class="bg-color-sky-light">
        <div class="content-xs container">
            <div class="row">
                <div class="col-xs-12 col-md-9 no-space">
                    @yield('content')
                </div>
                <div class="col-xs-12 col-md-3">
                @section('sidebar')
                    @include('layouts.partials.hot')
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