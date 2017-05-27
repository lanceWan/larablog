@extends('layouts.admin')
@section('css')
<link href="{{asset('vendors/editor/css/editormd.min.css')}}" rel="stylesheet" type="text/css" />
<link href="{{asset('vendors/layui/css/layui.css')}}" rel="stylesheet">
<link href="{{asset('vendors/bootstrap-select/bootstrap-select.min.css')}}" rel="stylesheet">
<link href="{{asset('vendors/bootstrap-tagsinput/bootstrap-tagsinput.css')}}" rel="stylesheet">
<link href="{{asset('vendors/jasny/jasny-bootstrap.min.css')}}" rel="stylesheet">
<link href="{{asset('vendors/iCheck/custom.css')}}" rel="stylesheet">
@endsection
@section('content')
@inject('articlePresenter','App\Presenters\Admin\ArticlePresenter')
<div class="row wrapper border-bottom white-bg page-heading p-h-md">
  <div class="col-lg-10">
    <h2>{!!trans('admin/article.title')!!}</h2>
    <ol class="breadcrumb">
        <li>
            <a href="{{url('admin/dash')}}">{!!trans('admin/breadcrumb.home')!!}</a>
        </li>
        <li>
            <a href="{{url('admin/article')}}">{!!trans('admin/breadcrumb.article.list')!!}</a>
        </li>
        <li class="active">
            <strong>{!!trans('admin/breadcrumb.article.create')!!}</strong>
        </li>
    </ol>
  </div>
</div>
<div class="wrapper wrapper-content animated fadeInRight">
  <div class="row">
    <div class="col-lg-12">
      <div class="ibox float-e-margins">
        <div class="ibox-title">
          <h5>{!!trans('admin/article.create')!!}</h5>
          <div class="ibox-tools">
              <a class="collapse-link">
                  <i class="fa fa-chevron-up"></i>
              </a>
              <a class="close-link">
                  <i class="fa fa-times"></i>
              </a>
          </div>
        </div>
        <form method="post" action="{{url('admin/article')}}" class="form-horizontal" role="form" enctype="multipart/form-data">
          {{csrf_field()}}
        <div class="ibox-content">
            <div class="col-lg-12 m-sm">
              <div class="tabs-container">
                  <ul class="nav nav-tabs">
                      <li class="active"><a data-toggle="tab" href="#tab-1"> <i class="fa fa-desktop"></i> Basic</a></li>
                      <li class=""><a data-toggle="tab" href="#tab-2"><i class="fa fa-laptop"></i> SEO</a></li>
                  </ul>
                  <div class="tab-content">
                      <div id="tab-1" class="tab-pane active">
                          <div class="panel-body">
                            <div class="form-group{{ $errors->has('title') ? ' has-error' : '' }}">
                              <label class="col-sm-1 control-label">{{trans('admin/article.model.title')}}</label>
                              <div class="col-sm-10">
                                <input type="text" class="form-control" name="title" value="{{old('title')}}" placeholder="{{trans('admin/article.model.title')}}">
                                @if ($errors->has('title'))
                                <span class="help-block m-b-none text-danger">{{ $errors->first('title') }}</span>
                                @endif
                              </div>
                            </div>
                            <div class="hr-line-dashed"></div>
                            <div class="form-group{{ $errors->has('author') ? ' has-error' : '' }}">
                              <label class="col-sm-1 control-label">{{trans('admin/article.model.author')}}</label>
                              <div class="col-sm-10">
                                <input type="text" class="form-control" name="author" value="{{old('author',auth()->user()->name)}}" placeholder="{{trans('admin/article.model.author')}}">
                                @if ($errors->has('author'))
                                <span class="help-block m-b-none text-danger">{{ $errors->first('author') }}</span>
                                @endif
                              </div>
                            </div>
                            <div class="hr-line-dashed"></div>
                            <div class="form-group{{ $errors->has('cid') ? ' has-error' : '' }}">
                              <label class="col-sm-1 control-label">{{trans('admin/article.model.cid')}}</label>
                              <div class="col-sm-10">
                                <select data-placeholder="Choose a category..." class="selectpicker form-control" name="cid[]" multiple="multiple">
                                  {!!$articlePresenter->categoryList($categories)!!}
                                </select>
                                @if ($errors->has('cid'))
                                <span class="help-block m-b-none text-danger">{{ $errors->first('cid') }}</span>
                                @endif
                              </div>
                            </div>
                            <div class="hr-line-dashed"></div>
                            <div class="form-group">
                              <label class="col-sm-1 control-label">{{trans('admin/article.model.lead')}}</label>
                              <div class="col-sm-10">
                                <textarea class="layui-textarea" id="lead" name="lead" style="display: none">{!!old('lead')!!}</textarea>
                              </div>
                            </div>
                            <div class="hr-line-dashed"></div>
                            <div class="form-group">
                              <label class="col-sm-1 control-label">{{trans('admin/article.model.banner')}}</label>
                              <div class="col-sm-10">
                                <div class="fileinput fileinput-new" data-provides="fileinput">
                                  <div class="fileinput-new thumbnail" style="width: 200px; height: 150px;">
                                    <img src="{{asset('admin/img/no-image.png')}}">
                                  </div>
                                  <div class="fileinput-preview fileinput-exists thumbnail" style="max-width: 200px; max-height: 150px;"></div>
                                  <div>
                                    <span class="btn btn-default btn-file"><span class="fileinput-new">Select image</span><span class="fileinput-exists">Change</span><input type="file" name="banner"></span>
                                    <a href="#" class="btn btn-default fileinput-exists" data-dismiss="fileinput">Remove</a>
                                  </div>
                                </div>
                                <input type="text" class="form-control" name="edit_banner" value="{{old('edit_banner')}}">
                              </div>
                            </div>
                            <div class="hr-line-dashed"></div>
                            <div class="form-group{{ $errors->has('content_mark') ? ' has-error' : '' }}">
                              <label class="col-sm-1 control-label">{{trans('admin/article.model.content_mark')}}</label>
                              <div class="col-sm-10">
                                <div id="editor"><textarea style="display: none;" name="content_mark">{!!old('content_mark')!!}</textarea></div>
                                @if ($errors->has('content_mark'))
                                <span class="help-block m-b-none text-danger">{{ $errors->first('content_mark') }}</span>
                                @endif
                              </div>
                            </div>
                            <div class="hr-line-dashed"></div>
                            <div class="form-group{{ $errors->has('tags') ? ' has-error' : '' }}">
                              <label class="col-sm-1 control-label">{{trans('admin/article.tags')}}</label>
                              <div class="col-sm-10">
                                <select data-placeholder="Choose a category..." class="selectpicker form-control" name="tags[]" multiple="multiple">
                                  {!!$articlePresenter->tagList($tags)!!}
                                </select>
                                @if ($errors->has('tags'))
                                <span class="help-block m-b-none text-danger">{{ $errors->first('tags') }}</span>
                                @endif
                              </div>
                            </div>
                            <div class="hr-line-dashed"></div>
                            <div class="form-group">
                              <label class="col-sm-1 control-label">{{trans('admin/article.new_tags')}}</label>
                              <div class="col-sm-10">
                                <input class="tagsinput form-control" type="text" value="{{old('new_tags')}}" name="new_tags" data-role="tagsinput"/>
                              </div>
                            </div>
                            <div class="hr-line-dashed"></div>
                            <div class="form-group">
                              <label class="col-sm-1 control-label">{{trans('admin/article.push')}}</label>
                              <div class="col-sm-10">
                                <div class="i-checks">
                                  <label> <input type="checkbox" name="status" @if(old('status')) checked @endif value="1"></label>
                                </div>
                              </div>
                            </div>
                          </div>
                      </div>
                      <div id="tab-2" class="tab-pane">
                        <div class="panel-body">
                          <div class="hr-line-dashed"></div>
                          <div class="form-group">
                            <label class="col-sm-1 control-label">{{trans('admin/article.model.meta_title')}}</label>
                            <div class="col-sm-10">
                              <input type="text" class="form-control" name="meta_title" value="{{old('meta_title')}}" placeholder="{{trans('admin/article.model.meta_title')}}">
                            </div>
                          </div>
                          <div class="hr-line-dashed"></div>
                          <div class="form-group">
                            <label class="col-sm-1 control-label">{{trans('admin/article.model.meta_keyword')}}</label>
                            <div class="col-sm-10">
                              <input type="text" class="form-control" name="meta_keyword" value="{{old('meta_keyword')}}" placeholder="{{trans('admin/article.model.meta_keyword')}}">
                            </div>
                          </div>
                          <div class="hr-line-dashed"></div>
                          <div class="form-group">
                            <label class="col-sm-1 control-label">{{trans('admin/article.model.meta_description')}}</label>
                            <div class="col-sm-10">
                              <textarea class="form-control" name="meta_description" placeholder="{{trans('admin/article.model.meta_description')}}">{{old('meta_description')}}</textarea>
                            </div>
                          </div>
                        </div>
                      </div>
                  </div>
              </div>
            </div>
            <div class="form-group">
              <div class="col-sm-4 col-sm-offset-2">
                  <a class="btn btn-white" href="{{url()->previous()}}">{!!trans('admin/action.actionButton.cancel')!!}</a>
                  <button class="btn btn-primary submit-article" type="button">{!!trans('admin/action.actionButton.submit')!!}</button>
              </div>
            </div>
        </div>
        </form>
      </div>
  	</div>
  </div>
</div>
@endsection
@section('js')
<script type="text/javascript" src="{{asset('vendors/editor/editormd.min.js')}}"></script>
<script type="text/javascript" src="{{asset('vendors/bootstrap-select/bootstrap-select.min.js')}}"></script>
<script type="text/javascript" src="{{asset('vendors/bootstrap-tagsinput/bootstrap-tagsinput.js')}}"></script>
<script type="text/javascript" src="{{asset('vendors/jasny/jasny-bootstrap.min.js')}}"></script>
<script type="text/javascript" src="{{asset('vendors/layui/layui.js')}}"></script>
<script type="text/javascript" src="{{asset('vendors/iCheck/icheck.min.js')}}"></script>
<script type="text/javascript" src="{{asset('admin/js/article/article.js')}}"></script>
@endsection