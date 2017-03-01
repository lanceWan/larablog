<?php
namespace App\Http\ViewComposers;
use Illuminate\View\View;
use App\Traits\RedisOperationTrait;
class RecommendedArticlesComposer
{
    use RedisOperationTrait;

    public function compose(View $view)
    {
    	$recommendedArticles = $this->zrevrange(0,10);
		$view->with('recommendedArticles',$recommendedArticles);
    }
}