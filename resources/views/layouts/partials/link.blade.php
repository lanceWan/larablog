@inject('presenter', 'App\Presenters\Front\BlogPresenter')
<div class="blog-sidebar margin-b-30">
    <div class="blog-sidebar-heading">
        <i class="blog-sidebar-heading-icon fa fa-link"></i>
        <h4 class="blog-sidebar-heading-title">友情链接</h4>
    </div>
    <div class="blog-sidebar-content">
        <ul class="list-unstyled lists-base">
            {!! $presenter->linkList($links) !!}
        </ul>
    </div>
</div>