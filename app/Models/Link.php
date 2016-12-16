<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;
class Link extends Model implements Transformable
{
    use TransformableTrait;

    protected $fillable = ['name','url','description'];


    public function transform()
    {
    	return [
            'id'    => (int)$this->id,
    		'name' => $this->name,
    		'description' => $this->description,
    		'lead' => $this->lead,
    	];
    }
}
