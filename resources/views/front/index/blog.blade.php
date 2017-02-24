@extends('layouts.blog')
@section('content')
@inject('presenter', 'App\Presenters\Front\IndexPresenter')
{!! $presenter->articleList($articles) !!}
@endsection

@section('paginate')
{!! $articles->fragment('pageScroll')->links('pagination::iwanli') !!}
@endsection