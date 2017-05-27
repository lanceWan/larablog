<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class Category extends Model implements Transformable
{
    use TransformableTrait;

    protected $fillable = ['pid', 'name', 'url', 'icon', 'sort'];

    public function setSortAttribute($value)
    {
    	if ($value && is_numeric($value)) {
	        $this->attributes['sort'] = intval($value);
    	}else{
    		$this->attributes['sort'] = 0;
    	}
    }

    public function transform()
    {
        return [
            'id'     => (int) $this->id,
        	'pid'    => (int) $this->pid,
            'name'   => $this->name,
            'icon'   => $this->icon,
            'sort' 	 => $this->sort ? $this->sort:0
        ];
    }

}
