<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;
use App\Traits\ActionButtonAttributeTrait;
class Tag extends Model implements Transformable
{
    use TransformableTrait,ActionButtonAttributeTrait;

    protected $fillable = ['name'];
    
    private $action = 'tag';

    public function transform()
    {
        return [
            'id'     => (int) $this->id,
            'name'   => $this->name,
        ];
    }

}
