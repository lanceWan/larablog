@extends('layouts.blog')
@section('meta')
<title>{{ $category->name }}-{{$settings['title']}}</title>
<meta name="keywords" content="{{$settings['keywords']}}" />
<meta name="description" content="{{$settings['description']}},{{$category->name}}">
<meta name="author" content="{{$settings['author']}}">
@endsection
@section('promo')
<section class="breadcrumbs-v5">
    <div class="container">
        <h2 class="breadcrumbs-v5-title">I am Wanli</h2>
        <span class="breadcrumbs-v5-subtitle">I am a slow walker, but I never walk backwards...</span>
    </div>
</section>
<section class="breadcrumbs-v1">
    <div class="container">
        <h2 class="breadcrumbs-v1-title">{{$category->name}}</h2>
        <ol class="breadcrumbs-v1-links">
            <li><a href="http://blog.iwanli.me">Home</a></li>
            <li class="active">{{$category->name}}</li>
        </ol>
    </div>
</section>
@endsection
@section('content')
@inject('presenter', 'App\Presenters\Front\BlogPresenter')
{!! $presenter->articleList($articles) !!}
@endsection

@section('paginate')
{!! $articles->fragment('pageScroll')->links('pagination::iwanli') !!}
@endsection