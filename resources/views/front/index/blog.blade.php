@extends('layouts.blog')
@section('content')
@inject('presenter', 'App\Presenters\Front\BlogPresenter')
{!! $presenter->articleList($articles) !!}
@endsection

@section('paginate')
{!! $articles->fragment('pageScroll')->links('pagination::iwanli') !!}
@endsection