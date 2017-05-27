@inject('categoryPresenter','App\Presenters\Admin\CategoryPresenter')
<div class="ibox float-e-margins animated bounceIn formBox" id="editBox">
  <div class="ibox-title">
    <h5>{{trans('admin/category.edit')}}</h5>
    <div class="ibox-tools">
      <a class="close-link">
          <i class="fa fa-times"></i>
      </a>
    </div>
  </div>
  <div class="ibox-content">
    <form method="post" action="{{url('admin/category',[$category->id])}}" class="form-horizontal" id="editForm">
      {!!csrf_field()!!}
      {{method_field('PUT')}}
      <input type="hidden" name="id" value="{{$category->id}}">
      <div class="form-group">
        <label class="col-sm-2 control-label">{{trans('admin/category.model.name')}}</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" placeholder="{{trans('admin/category.model.name')}}" name="name" value="{{$category->name}}">
        </div>
      </div>
      <div class="hr-line-dashed"></div>
      <div class="form-group">
        <label class="col-sm-2 control-label">{{trans('admin/category.model.pid')}}</label>
        <div class="col-sm-10">
          <select class="form-control" name="pid">
            {!!$categoryPresenter->topMenuList($categories,$category->pid)!!}
          </select>
        </div>
      </div>
      <div class="hr-line-dashed"></div>
      <div class="form-group">
        <label class="col-sm-2 control-label">{{trans('admin/category.model.url')}}</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" placeholder="{{trans('admin/category.model.url')}}" name="url" value="{{$category->url}}">
        </div>
      </div>
      <div class="hr-line-dashed"></div>
      <div class="form-group">
        <label class="col-sm-2 control-label">{{trans('admin/category.model.icon')}}</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" placeholder="{{trans('admin/category.model.icon')}}" name="icon" value="{{$category->icon}}">
          <span class="help-block m-b-none">{!!trans('admin/category.moreIcon')!!}</span>
        </div>
      </div>
      <div class="hr-line-dashed"></div>
      <div class="form-group">
        <label class="col-sm-2 control-label">{{trans('admin/category.model.sort')}}</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" placeholder="{{trans('admin/category.model.sort')}}" name="sort" value="{{$category->sort}}">
        </div>
      </div>
      <div class="hr-line-dashed"></div>
      <div class="form-group">
          <div class="col-sm-4 col-sm-offset-2">
              <a class="btn btn-white close-link">{!!trans('admin/action.actionButton.close')!!}</a>
              <button class="btn btn-primary editButton ladda-button"  data-style="zoom-in">{!!trans('admin/action.actionButton.submit')!!}</button>
          </div>
      </div>
    </form>
  </div>
</div>