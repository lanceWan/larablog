@extends('layouts.blog')
@section('snow')
<div class="snow-container"></div>
@endsection
@section('content')
@inject('presenter', 'App\Presenters\Front\BlogPresenter')
{!! $presenter->articleList($articles) !!}
@endsection

@section('paginate')
{!! $articles->fragment('pageScroll')->links('pagination::iwanli') !!}
@endsection

@section('js')
<script type="text/javascript" src="{{ elixir('js/snow.js') }}"></script>
@endsection