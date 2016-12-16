<?php
namespace App\Repositories\Eloquent;
use Prettus\Repository\Eloquent\BaseRepository;
use App\Repositories\Contracts\ArticleRepository;
use App\Models\Article;
use Prettus\Repository\Presenter\ModelFractalPresenter;
use App\Repositories\Criteria\FilterArticleCriteriaCriteria;
use App\Traits\EncryptIdsTrait;
/**
 * Class ArticleRepositoryEloquent
 * @package namespace App\Repositories\Eloquent;
 */
class ArticleRepositoryEloquent extends BaseRepository implements ArticleRepository
{
    use EncryptIdsTrait;
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Article::class;
    }

    public function boot()
    {
        $this->setEncryptConnection('article');
    }

    public function presenter()
    {
        return ModelFractalPresenter::class;
    }

    /**
     * 获取文章列表
     * @author 晚黎
     * @date   2016-12-13T13:47:23+0800
     * @param  [type]                   $start  [description]
     * @param  [type]                   $length [description]
     * @param  [type]                   $search [description]
     * @param  [type]                   $order  [description]
     * @return [type]                           [description]
     */
    public function getArticleList($start,$length,$search,$order)
    {
        $article = $this->model;
        if ($search['value']) {
            if($search['regex'] == 'true'){
                $article = $article->where('title', 'like', "%{$search['value']}%");
            }else{
                $article = $article->where('title', $search['value']);
            }
        }

        $count = $article->count();
        
        $article = $article->orderBy($order['name'], $order['dir']);

        $articles = $article->offset($start)->limit($length)->get();

        if ($articles) {
            $articles = $articles->each(function ($item,$index)
            {
                $item->encodeId = $this->encodeId($item->id);
                return $item;
            });
        }

        return compact('count','articles');
    }
    /**
     * 获取文章信息
     * @author 晚黎
     * @date   2016-12-13T14:15:29+0800
     * @param  [type]                   $id [description]
     * @return [type]                       [description]
     */
    public function findArticleById($id)
    {
        $this->pushCriteria(FilterArticleCriteriaCriteria::class);
        return $this->skipPresenter()->find($this->decodeId($id))->toArray();
    }
}
