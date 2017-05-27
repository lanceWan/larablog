<?php

namespace App\Repositories\Criteria;

use Prettus\Repository\Contracts\CriteriaInterface;
use Prettus\Repository\Contracts\RepositoryInterface;

/**
 * Class FilterStatusCriteria
 * @package namespace App\Repositories\Criteria;
 */
class FilterStatusCriteria implements CriteriaInterface
{
    protected $status;

    public function __construct($status)
    {
        $this->status = $status;
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

        return $model->where('status', $this->status);
    }
}
