<?php
namespace App\Repositories\Eloquent;
use Prettus\Repository\Eloquent\BaseRepository;
use App\Repositories\Contracts\CategoryRepository;
use App\Models\Category;
use Prettus\Repository\Presenter\ModelFractalPresenter;
/**
 * Class CategoryRepositoryEloquent
 * @package namespace App\Repositories\Eloquent;
 */
class CategoryRepositoryEloquent extends BaseRepository implements CategoryRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Category::class;
    }

    public function presenter()
    {
        return ModelFractalPresenter::class;
    }

    public function allCategories()
    {
        return $this->model->orderBy('sort','desc')->get()->toArray();
    }
    /**
     * 获取文章分类
     * @author 晚黎
     * @date   2016-12-09T16:00:26+0800
     * @return [type]                   [description]
     */
    public function getArticleCategories()
    {
        return $this->skipPresenter()->all()->toArray();
    }
}
