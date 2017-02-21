<?php

namespace App\Repositories\Eloquent;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\Contracts\LinkRepository;
use App\Models\Link;
use App\Repositories\Validators\LinkValidator;
use Prettus\Repository\Presenter\ModelFractalPresenter;
use App\Traits\EncryptIdsTrait;
/**
 * Class LinkRepositoryEloquent
 * @package namespace App\Repositories\Eloquent;
 */
class LinkRepositoryEloquent extends BaseRepository implements LinkRepository
{
    use EncryptIdsTrait;
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Link::class;
    }

    public function presenter()
    {
        return ModelFractalPresenter::class;
    }

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->setEncryptConnection('link');
    }

    /**
     * 获取友情链接数据
     * @author 晚黎
     * @date   2016-12-14T15:57:44+0800
     * @param  [type]                   $start  [description]
     * @param  [type]                   $length [description]
     * @param  [type]                   $search [description]
     * @param  [type]                   $order  [description]
     * @return [type]                           [description]
     */
    public function getLinkList($start,$length,$search,$order)
    {
        $link = $this->model;
        if ($search['value']) {
            if($search['regex'] == 'true'){
                $link = $link->where('name', 'like', "%{$search['value']}%")->orWhere('url','like', "%{$search['value']}%");
            }else{
                $link = $link->where('name', $search['value'])->orWhere('url', "{$search['value']}");
            }
        }

        $count = $link->count();

        $link = $link->orderBy($order['name'], $order['dir']);

        $links = $this->getEncryptId($link->offset($start)->limit($length)->get());

        return compact('count','links');
    }

}
