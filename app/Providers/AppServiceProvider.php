<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        /**
         * 视图composer共享后台菜单数据
         */
        view()->composer(
            'layouts.partials.sidebar', 'App\Http\ViewComposers\MenuComposer'
        );
        view()->composer(
            ['layouts.index','layouts.blog', 'front.article.detail', 'front.category.list' , 'front.index.search'], 'App\Http\ViewComposers\SettingsComposer'
        );
        view()->composer(
            'layouts.partials.category', 'App\Http\ViewComposers\CategoryComposer'
        );
        view()->composer(
            'layouts.partials.link', 'App\Http\ViewComposers\FriendshipLinkComposer'
        );
        view()->composer(
            'layouts.partials.hot', 'App\Http\ViewComposers\RecommendedArticlesComposer'
        );
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
