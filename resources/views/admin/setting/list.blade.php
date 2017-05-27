@extends('layouts.admin')
@section('css')
<link href="{{asset('vendors/layui/css/layui.css')}}" rel="stylesheet">
<link href="{{asset('vendors/jasny/jasny-bootstrap.min.css')}}" rel="stylesheet">
@endsection
@section('content')
<div class="row wrapper border-bottom white-bg page-heading p-h-md">
  <div class="col-lg-10">
    <h2>{!!trans('admin/breadcrumb.setting.list')!!}</h2>
    <ol class="breadcrumb">
        <li>
            <a href="{{url('admin/dash')}}">{!!trans('admin/breadcrumb.home')!!}</a>
        </li>
        <li class="active">
            <strong>{!!trans('admin/breadcrumb.setting.list')!!}</strong>
        </li>
    </ol>
  </div>
</div>
<div class="wrapper wrapper-content animated fadeInRight">
  <div class="row">
    <div class="col-lg-12">
      <div class="ibox float-e-margins">
        <div class="ibox-title">
          <h5>{!!trans('admin/breadcrumb.setting.list')!!}</h5>
          <div class="ibox-tools">
              <a class="collapse-link">
                  <i class="fa fa-chevron-up"></i>
              </a>
              <a class="close-link">
                  <i class="fa fa-times"></i>
              </a>
          </div>
        </div>
          <div class="ibox-content">
            @include('flash::message')
            <form method="post" action="{{url('admin/setting')}}" class="form-horizontal" role="form" enctype="multipart/form-data">
              {{csrf_field()}}
              <div class="form-group">
                <label class="col-sm-1 control-label">{{trans('admin/setting.title')}}</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" name="title" value="{{$setting['title']}}" placeholder="{{trans('admin/setting.title')}}">
                </div>
              </div>
              <div class="hr-line-dashed"></div>
              <div class="form-group">
                <label class="col-sm-1 control-label">{{trans('admin/setting.keywords')}}</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" name="keywords" value="{{$setting['keywords']}}" placeholder="{{trans('admin/setting.keywords')}}">
                </div>
              </div>
              <div class="hr-line-dashed"></div>
              <div class="form-group">
                <label class="col-sm-1 control-label">{{trans('admin/setting.description')}}</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" name="description" value="{{$setting['description']}}" placeholder="{{trans('admin/setting.description')}}">
                </div>
              </div>
              <div class="hr-line-dashed"></div>
              <div class="form-group">
                <label class="col-sm-1 control-label">{{trans('admin/setting.author')}}</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" name="author" value="{{$setting['author']}}" placeholder="{{trans('admin/setting.author')}}">
                </div>
              </div>
              <div class="hr-line-dashed"></div>
              <div class="form-group">
                <label class="col-sm-1 control-label">{{trans('admin/setting.about_title')}}</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" name="about_title" value="{{$setting['about_title']}}" placeholder="{{trans('admin/setting.about_title')}}">
                </div>
              </div>
              <div class="hr-line-dashed"></div>
              <div class="form-group">
                <label class="col-sm-1 control-label">{{trans('admin/setting.about_en_title')}}</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" name="about_en_title" value="{{$setting['about_en_title']}}" placeholder="{{trans('admin/setting.about_en_title')}}">
                </div>
              </div>
              <div class="hr-line-dashed"></div>
              <div class="form-group">
                <label class="col-sm-1 control-label">{{trans('admin/setting.about_content')}}</label>
                <div class="col-sm-10">
                  <textarea class="layui-textarea" id="about_content" name="about_content" style="display: none">{!!$setting['about_content']!!}</textarea>
                </div>
              </div>
              <div class="hr-line-dashed"></div>
              <div class="form-group">
                <label class="col-sm-1 control-label">{{trans('admin/setting.contact_qq')}}</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" name="contact_qq" value="{{$setting['contact_qq']}}" placeholder="{{trans('admin/setting.contact_qq')}}">
                </div>
              </div>
              <div class="hr-line-dashed"></div>
              <div class="form-group">
                <label class="col-sm-1 control-label">{{trans('admin/setting.contact_email')}}</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" name="contact_email" value="{{$setting['contact_email']}}" placeholder="{{trans('admin/setting.contact_email')}}">
                </div>
              </div>
              <div class="hr-line-dashed"></div>
              <div class="form-group">
                <label class="col-sm-1 control-label">{{trans('admin/setting.sponsor_alipay')}}</label>
                <div class="col-sm-10">
                  <div class="fileinput fileinput-new" data-provides="fileinput">
                    <div class="fileinput-new thumbnail" style="width: 200px; height: 150px;">
                      <img src="{{$setting['sponsor_alipay'] ? $setting['sponsor_alipay'] : asset('admin/img/no-image.png')}}">
                    </div>
                    <div class="fileinput-preview fileinput-exists thumbnail" style="max-width: 200px; max-height: 150px;"></div>
                    <div>
                      <span class="btn btn-default btn-file"><span class="fileinput-new">Select image</span><span class="fileinput-exists">Change</span><input type="file" name="sponsor_alipay"></span>
                      <a href="#" class="btn btn-default fileinput-exists" data-dismiss="fileinput">Remove</a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="hr-line-dashed"></div>
              <div class="form-group">
                <label class="col-sm-1 control-label">{{trans('admin/setting.sponsor_wechat')}}</label>
                <div class="col-sm-10">
                  <div class="fileinput fileinput-new" data-provides="fileinput">
                    <div class="fileinput-new thumbnail" style="width: 200px; height: 150px;">
                      <img src="{{$setting['sponsor_wechat'] ? $setting['sponsor_wechat'] : asset('admin/img/no-image.png')}}">
                    </div>
                    <div class="fileinput-preview fileinput-exists thumbnail" style="max-width: 200px; max-height: 150px;"></div>
                    <div>
                      <span class="btn btn-default btn-file"><span class="fileinput-new">Select image</span><span class="fileinput-exists">Change</span><input type="file" name="sponsor_wechat"></span>
                      <a href="#" class="btn btn-default fileinput-exists" data-dismiss="fileinput">Remove</a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="hr-line-dashed"></div>
              <div class="form-group">
                <label class="col-sm-1 control-label">{{trans('admin/setting.copyright')}}</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" name="copyright" value="{{$setting['copyright']}}" placeholder="{{trans('admin/setting.copyright')}}">
                </div>
              </div>
              <div class="hr-line-dashed"></div>
              <div class="form-group">
                <label class="col-sm-1 control-label">{{trans('admin/setting.statistics')}}</label>
                <div class="col-sm-10">
                  <textarea name="statistics" class="form-control" placeholder="{{trans('admin/setting.statistics')}}">{{$setting['statistics']}}</textarea>
                </div>
              </div>
              <div class="hr-line-dashed"></div>
              <div class="form-group">
                <label class="col-sm-1 control-label">{{trans('admin/setting.comment')}}</label>
                <div class="col-sm-10">
                  <textarea name="comment" class="form-control" placeholder="{{trans('admin/setting.comment')}}">{{$setting['comment']}}</textarea>
                  <span class="help-block m-b-none text-danger">{{trans('admin/setting.info')}}</span>
                </div>
              </div>
              <div class="hr-line-dashed"></div>
              <div class="form-group">
                <label class="col-sm-1 control-label">{{trans('admin/setting.share')}}</label>
                <div class="col-sm-10">
                  <textarea name="share" class="form-control" placeholder="{{trans('admin/setting.share')}}">{{$setting['share']}}</textarea>
                </div>
              </div>
              <div class="hr-line-dashed"></div>
              <div class="form-group">
                <div class="col-sm-4 col-sm-offset-2">
                    <a class="btn btn-white" href="{{url()->previous()}}">{!!trans('admin/action.actionButton.cancel')!!}</a>
                    <button class="btn btn-primary submit-article" type="submit">{!!trans('admin/action.actionButton.submit')!!}</button>
                </div>
              </div>
            </form>
          </div>
      </div>
  	</div>
  </div>
</div>
@endsection
@section('js')
<script type="text/javascript" src="{{asset('vendors/jasny/jasny-bootstrap.min.js')}}"></script>
<script type="text/javascript" src="{{asset('vendors/layui/layui.js')}}"></script>
<script type="text/javascript" src="{{asset('admin/js/setting/setting.js')}}"></script>
@endsection