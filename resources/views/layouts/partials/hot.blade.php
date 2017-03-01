@inject('presenter', 'App\Presenters\Front\BlogPresenter')
<div class="blog-sidebar margin-b-30">
    <div class="blog-sidebar-heading">
        <i class="blog-sidebar-heading-icon fa fa-fire"></i>
        <h4 class="blog-sidebar-heading-title">热门文章</h4>
    </div>
    <div class="blog-sidebar-content">
        <ul class="timeline-v2">
            {!! $presenter->recommendedArticleList($recommendedArticles) !!}
            <li class="clearfix" style="float: none;"></li>
        </ul>
    </div>
</div>