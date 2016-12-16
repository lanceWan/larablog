@extends('layouts.admin')
@section('css')
<style>
  .grid .ibox {
      margin-bottom: 0;
  }
  .grid-sizer,.grid-item { width: 20%; }
  .grid-item{
    padding: 10px 0;
    margin-bottom: 20px;
  }
</style>
@endsection
@section('content')
<div class="row wrapper border-bottom white-bg page-heading">
  <div class="col-lg-10">
    <h2>{!!trans('admin/tag.title')!!}</h2>
    <ol class="breadcrumb">
        <li>
            <a href="{{url('admin/dash')}}">{!!trans('admin/breadcrumb.home')!!}</a>
        </li>
        <li class="active">
            <strong>{!!trans('admin/breadcrumb.media.list')!!}</strong>
        </li>
    </ol>
  </div>
</div>
<div class="wrapper wrapper-content animated fadeInRight">

  <div class="row">
      <div class="col-lg-12">

          <div class="ibox">
              <div class="ibox-content ">
                  <h2>
                      {!!trans('admin/breadcrumb.media.list')!!}
                  </h2>
                  <p>
                      {!!trans('admin/media.info')!!}
                  </p>
              </div>
          </div>


      </div>
  </div>
  <div class="grid" >
    <div class="grid-sizer"></div>
    @if($images)
    @foreach($images as $k => $image)
    <div class="grid-item">
        <div class="ibox">
            <div class="ibox-content">
                <h4 class="font-bold">
                    Example masonary box
                </h4>
                <img src="{{'http://'.env('QINIU_DOMAINS_DEFAULT').'/'.$image}}" class="img-responsive" alt="Responsive image">
                <p>sdfasdf</p>
            </div>
        </div>
    </div>
    @endforeach
    @endif
</div>
  

</div>
@endsection
@section('js')
<script type="text/javascript" src="{{asset('vendors/masonary/masonry.pkgd.min.js')}}"></script>
<script type="text/javascript" src="{{asset('admin/js/media/media.js')}}"></script>
@endsection