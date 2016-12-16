<?php

namespace App\Repositories\Eloquent;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\Contracts\TagRepository;
use App\Models\Tag;
use Prettus\Repository\Presenter\ModelFractalPresenter;
/**
 * Class TagRepositoryEloquent
 * @package namespace App\Repositories\Eloquent;
 */
class TagRepositoryEloquent extends BaseRepository implements TagRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Tag::class;
    }


    public function presenter()
    {
        return ModelFractalPresenter::class;
    }


    /**
     * 查询标签并分页
     * @author 晚黎
     * @date   2016-12-09T11:15:36+0800
     * @param  [type]                   $start  [起始数目]
     * @param  [type]                   $length [读取条数]
     * @param  [type]                   $search [搜索数组数据]
     * @param  [type]                   $order  [排序数组数据]
     * @return [type]                           [查询结果集，包含查询的数量及查询的结果对象]
     */
    public function getTagList($start,$length,$search,$order)
    {
        $tag = $this->model;
        if ($search['value']) {
            if($search['regex'] == 'true'){
                $tag = $tag->where('name', 'like', "%{$search['value']}%");
            }else{
                $tag = $tag->where('name', $search['value']);
            }
        }

        $count = $tag->count();
        
        $tag = $tag->orderBy($order['name'], $order['dir']);

        $tags = $tag->offset($start)->limit($length)->get();

        return compact('count','tags');
    }
    /**
     * 获取所有标签
     * @author 晚黎
     * @date   2016-12-12T14:25:11+0800
     * @return [type]                   [description]
     */
    public function allTags()
    {
        return $this->model->all()->toArray();
    }

    /**
     * 查找标签，不存在就创建
     * @author 晚黎
     * @date   2016-12-12T16:50:26+0800
     * @param  [type]                   $attributes [description]
     * @return [type]                               [description]
     */
    public function firstOrCreate($attributes)
    {
        return $this->model->firstOrCreate($attributes);
    }
}
