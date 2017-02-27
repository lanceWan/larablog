@inject('categoryPresenter','App\Presenters\Admin\CategoryPresenter')
<div class="ibox float-e-margins animated bounceIn formBox" id="createBox">
  <div class="ibox-title">
    <h5>{{trans('admin/category.create')}}</h5>
    <div class="ibox-tools">
      <a class="close-link">
          <i class="fa fa-times"></i>
      </a>
    </div>
  </div>
  <div class="ibox-content">
    <form method="post" action="{{url('admin/category')}}" class="form-horizontal" id="createForm">
      {!!csrf_field()!!}
      <div class="form-group">
        <label class="col-sm-2 control-label">{{trans('admin/category.model.name')}}</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" placeholder="{{trans('admin/category.model.name')}}" name="name">
        </div>
      </div>
      <div class="hr-line-dashed"></div>
      <div class="form-group">
        <label class="col-sm-2 control-label">{{trans('admin/category.model.pid')}}</label>
        <div class="col-sm-10">
          <select class="form-control" name="pid">
            {!!$categoryPresenter->topMenuList($categories)!!}
          </select>
        </div>
      </div>
      <div class="hr-line-dashed"></div>
      <div class="form-group">
        <label class="col-sm-2 control-label">{{trans('admin/category.model.url')}}</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" placeholder="{{trans('admin/category.model.url')}}" name="url">
        </div>
      </div>
      <div class="hr-line-dashed"></div>
      <div class="form-group">
        <label class="col-sm-2 control-label">{{trans('admin/category.model.icon')}}</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" placeholder="{{trans('admin/category.model.icon')}}" name="icon">
          <span class="help-block m-b-none">{!!trans('admin/category.moreIcon')!!}</span>
        </div>
      </div>
      <div class="hr-line-dashed"></div>
      <div class="form-group">
        <label class="col-sm-2 control-label">{{trans('admin/category.model.sort')}}</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" placeholder="{{trans('admin/category.model.sort')}}" name="sort">
        </div>
      </div>
      <div class="hr-line-dashed"></div>
      <div class="form-group">
          <div class="col-sm-4 col-sm-offset-2">
            <a class="btn btn-white close-link">{!!trans('admin/action.actionButton.close')!!}</a>
            <button class="btn btn-primary createButton ladda-button"  data-style="zoom-in">{!!trans('admin/action.actionButton.submit')!!}</button>
          </div>
      </div>
    </form>
  </div>
</div>