<?php
namespace App\Repositories\Eloquent;
use Prettus\Repository\Eloquent\BaseRepository;
use App\Repositories\Contracts\CategoryRepository;
use App\Models\ArticleCategory;
use Prettus\Repository\Presenter\ModelFractalPresenter;
use App\Repositories\Criteria\FilterArticleCategoriesCriteria;
/**
 * Class CategoryRepositoryEloquent
 * @package namespace App\Repositories\Eloquent;
 */
class ArticleCategoryRepositoryEloquent extends BaseRepository implements CategoryRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return ArticleCategory::class;
    }
    
}
