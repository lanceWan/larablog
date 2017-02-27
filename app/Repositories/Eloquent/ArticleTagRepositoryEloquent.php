<?php
namespace App\Repositories\Eloquent;
use Prettus\Repository\Eloquent\BaseRepository;
use App\Repositories\Contracts\ArticleTagRepository;
use App\Models\ArticleTag;
/**
 * Class CategoryRepositoryEloquent
 * @package namespace App\Repositories\Eloquent;
 */
class ArticleTagRepositoryEloquent extends BaseRepository implements ArticleTagRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return ArticleTag::class;
    }
    
}
