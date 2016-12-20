<?php
namespace App\Repositories\Eloquent;
use Prettus\Repository\Eloquent\BaseRepository;
use App\Repositories\Contracts\CommentRepository;
use App\Models\Comment;

/**
 * Class CommentRepositoryEloquent
 * @package namespace App\Repositories\Eloquent;
 */
class CommentRepositoryEloquent extends BaseRepository implements CommentRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Comment::class;
    }

    

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        
    }
}
