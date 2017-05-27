<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;
use App\Traits\ActionButtonAttributeTrait;
use App\Traits\EncryptIdsTrait;
class Link extends Model implements Transformable
{
    use TransformableTrait,ActionButtonAttributeTrait,EncryptIdsTrait;

    protected $fillable = ['name','url','description'];

    private $action = 'link';


    public function transform()
    {
      $this->setEncryptConnection('link');
    	return [
        'id'    => (int)$this->id,
    		'name' => $this->name,
    		'url' => $this->url,
        'encodeId' => $this->encodeId($this->id),
    		'description' => $this->description,
    	];
    }
}
