<?php

namespace App\Repositories\Criteria;

use Prettus\Repository\Contracts\CriteriaInterface;
use Prettus\Repository\Contracts\RepositoryInterface;

/**
 * Class FilterStatusCriteria
 * @package namespace App\Repositories\Criteria;
 */
class FilterSearchCriteria implements CriteriaInterface
{
    protected $q;

    public function __construct($q)
    {
        $this->q = $q;
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

        return $model->where('title', 'like', '%'.$this->q.'%');
    }
}
