<?php

namespace App\Repositories\Criteria;

use Prettus\Repository\Contracts\CriteriaInterface;
use Prettus\Repository\Contracts\RepositoryInterface;

/**
 * Class FilterStatusCriteria
 * @package namespace App\Repositories\Criteria;
 */
class FilterArticleIdsCriteria implements CriteriaInterface
{
    protected $articleIds;

    public function __construct($articleIds)
    {
        $this->articleIds = $articleIds;
    }
    /**
     * Apply criteria in query repository
     *
     * @param                     $model
     * @param RepositoryInterface $repository
     *
     * @return mixed
     */
    public function apply($model, RepositoryInterface $repository)
    {

        return $model->whereIn('id', $this->articleIds);
    }
}
