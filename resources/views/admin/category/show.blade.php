@inject('categoryPresenter','App\Presenters\Admin\CategoryPresenter')
<div class="ibox float-e-margins animated bounceIn formBox" id="showBox">
  <div class="ibox-title">
    <h5>{{trans('admin/category.info')}}</h5>
    <div class="ibox-tools">
      <a class="close-link">
          <i class="fa fa-times"></i>
      </a>
    </div>
  </div>
  <div class="ibox-content">
    <form class="form-horizontal" id="showForm">
      <div class="form-group">
        <label class="col-sm-3 control-label">{{trans('admin/category.model.name')}}</label>
        <div class="col-sm-9">
          <p class="form-control-static">{{$category->name}}</p>
        </div>
      </div>
      <div class="hr-line-dashed"></div>
      <div class="form-group">
        <label class="col-sm-3 control-label">{{trans('admin/category.model.pid')}}</label>
        <div class="col-sm-9">
          <p class="form-control-static">{{$categoryPresenter->topMenuName($categories,$category->pid)}}</p>
        </div>
      </div>
      <div class="hr-line-dashed"></div>
      <div class="form-group">
        <label class="col-sm-3 control-label">{{trans('admin/category.model.icon')}}</label>
        <div class="col-sm-9">
          <p class="form-control-static"><i class="{{$category->icon}}"></i></p>
        </div>
      </div>
      <div class="hr-line-dashed"></div>
      <div class="form-group">
        <label class="col-sm-3 control-label">{{trans('admin/category.model.sort')}}</label>
        <div class="col-sm-9">
          <p class="form-control-static">{{$category->sort}}</p>
        </div>
      </div>
      <div class="hr-line-dashed"></div>
      <div class="form-group">
          <div class="col-sm-4 col-sm-offset-2">
              <a class="btn btn-white close-link">{!!trans('admin/action.actionButton.close')!!}</a>
          </div>
      </div>
    </form>
  </div>
</div>