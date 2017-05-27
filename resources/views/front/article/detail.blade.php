@extends('layouts.blog')
@section('meta')
<title>{{empty($article->meta_title) ? $article->title.'-'.$settings['title'] : $article->meta_title}}</title>
<meta name="keywords" content="{{empty($article->meta_keyword) ? $settings['keywords'] : $article->meta_keyword}}" />
<meta name="description" content="{{empty($article->description) ? $settings['description'] : $article->meta_description}}">
<meta name="author" content="{{$settings['author']}}">
@endsection
@section('promo')
<section class="breadcrumbs-v5">
    <div class="container text-center">
        <h1 class="breadcrumbs-v5-post">{{$article->title}}</h1>
        <p class="breadcrumbs-v5-divider">热度：{{$visits}} ℃</p>
    </div>
</section>
@endsection
@section('content')
@inject('presenter', 'App\Presenters\Front\BlogPresenter')
<article class="blog-grid">
    <div class="blog-grid-content article margin-b-30">
        {!! $article->content_html !!}
        <hr>
        <span class="blog-single-post-source">Source: <a href="{{request()->fullUrl()}}">{{request()->fullUrl()}}</a></span>
    </div>

    <div class="bg-color-white">
        <div class="blog-single-post-content">
            <div class="heading-v1 text-center margin-b-30" style="padding: 0 15px">
                <h2 class="heading-v1-title">Leave a comment</h2>
                {!! $settings['comment'] !!}
                <div class="ds-thread" data-thread-key="{{$article->id}}" data-title="{{$article->title}}" data-url="{{request()->fullUrl()}}"></div>
            </div>
        </div>
    </div>
</article>
@endsection
@section('sidebar')
<div class="blog-sidebar margin-b-30">
    <div class="blog-sidebar-content scrollbar">
        <h3 class="portfolio-item-subitem-title">Published</h3>
        <p class="portfolio-item-subitem-paragraph">{{$article->created_at}}</p>
        <hr>
        <h3 class="portfolio-item-subitem-title">Categories</h3>
        <ul class="list-unstyled tags-v2 margin-b-20">
            {!! $presenter->postDetailCategories($article->category) !!}
        </ul>
        <hr>
        <h3 class="portfolio-item-subitem-title">Tags</h3>
        <ul class="list-unstyled tags-v2 margin-b-20">
            {!! $presenter->postDetailTags($article->tag) !!}
        </ul>
    </div>
</div>
@include('layouts.partials.link')
@endsection
@section('js')
{!! $settings['share'] !!}
@endsection