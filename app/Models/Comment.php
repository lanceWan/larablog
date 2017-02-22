<?php
namespace App\Models;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;
use Baum\Node;
class Comment extends Node implements Transformable
{
    use TransformableTrait;
    // 'parent_id' column name
    protected $parentColumn = 'pid';

    // 'lft' column name
    protected $leftColumn = 'lidx';

    // 'rgt' column name
    protected $rightColumn = 'ridx';

    // 'depth' column name
    protected $depthColumn = 'depth';

    protected $fillable = ['user_id','content'];

    protected $guarded = array('pid', 'lidx', 'ridx', 'depth');

}
