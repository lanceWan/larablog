<?php
namespace App\Http\ViewComposers;
use Illuminate\View\View;
use App\Traits\CategoryListTrait;
use App\Repositories\Eloquent\CategoryRepositoryEloquent;
class CategoryComposer
{
	use CategoryListTrait;
	protected $category;

	function __construct(CategoryRepositoryEloquent $category)
	{
		$this->category = $category;
	}
    public function compose(View $view)
    {
        $categories = $this->getCategoryFromCache();
		if (empty($categories)) {
			$categoriesData = $this->category->allCategories();
			$categories = $this->sortCategorySetCache($categoriesData);
		}
		$view->with('categories',$categories);
    }
}