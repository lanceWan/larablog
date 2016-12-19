@extends('layouts.admin')
@section('content')
<div class="row wrapper border-bottom white-bg page-heading">
  <div class="col-lg-10">
    <h2>{!!trans('admin/breadcrumb.media.list')!!}</h2>
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
              <div class="ibox-content">
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
  <div class="row" >
    @if($images)
    @foreach($images as $image)
    <div class="col-md-3">
      @foreach($image as $k => $v)
      <div class="ibox">
          <div class="ibox-content product-box">

              <div class="product-imitation " style="padding: 5px">
                <img src="{{'http://'.env('QINIU_DOMAINS_DEFAULT').'/'.$v}}" class="img-responsive" alt="Responsive image">
              </div>
              <div class="product-desc">
                  <p class="font-bold">图片地址：</p>

                  <p class="bg-info b-r-sm p-xs" id="copytext_{{$k}}" style="word-wrap:break-word;">
                      {{'http://'.env('QINIU_DOMAINS_DEFAULT').'/'.$v}}
                  </p>
                  <div class="hr-line-dashed"></div>
                  <div class="m-t text-righ">
                      <button data-clipboard-target="#copytext_{{$k}}" class="btn btn-xs btn-outline btn-info copytext"><i class="fa fa-copy"></i> Copy</button>
                      <button data-clipboard-text="![]({{'http://'.env('QINIU_DOMAINS_DEFAULT').'/'.$v}})" class="btn btn-xs btn-outline btn-warning copytext"><i class="fa fa-copy"></i> Copy As Markdown</button>
                      <button class="btn btn-xs btn-outline btn-danger deleteFile" data-name="{{$v}}"><i class="fa fa-trash"></i> delete</button>
                  </div>
              </div>
          </div>
      </div>
      @endforeach
    </div>
    @endforeach
    @endif
  </div>
</div>
@endsection
@section('js')
<script src="{{asset('vendors/clipboard/clipboard.min.js')}}"></script>
<script src="{{asset('vendors/layer/layer.js')}}"></script>
<script src="{{asset('admin/js/media/media.js')}}"></script>
@endsection