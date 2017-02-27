<?php
namespace App\Http\ViewComposers;
use Illuminate\View\View;
use App\Repositories\Eloquent\LinkRepositoryEloquent;
class FriendshipLinkComposer
{
    
    protected $link;

    
    public function __construct(LinkRepositoryEloquent $link)
    {
        $this->link = $link;
    }

    
    public function compose(View $view)
    {
    	$key = config('admin.global.cache.link');
        if (cache()->has($key)) {
			$links = cache()->get($key);
		}else{
			$links = $this->link->skipPresenter()->all()->toArray();
			cache()->forever($key,$links);
		}
		$view->with('links',$links);
    }
}