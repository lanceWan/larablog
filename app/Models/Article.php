<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;
use App\Traits\ActionButtonAttributeTrait;
class Article extends Model implements Transformable
{
    use TransformableTrait,ActionButtonAttributeTrait;

    protected $fillable = ['title','author','lead','banner','content_html','content_mark','meta_title','meta_keyword','meta_description','status',];
    private $action = 'article';


    public function tag()
    {
        return $this->belongsToMany('App\Models\Tag','article_tag','article_id','tag_id')->withTimestamps();
    }

    public function category()
    {
        return $this->belongsToMany('App\Models\Category','article_category','article_id','category_id')->withTimestamps();
    }

    public function transform()
    {
    	return [
        'id'    => $this->id,
    		'title' => $this->title,
    		'author' => $this->author,
    		'lead' => $this->lead,
    		'banner' => $this->banner,
    		'content_html' => $this->content_html,
    		'content_mark' => $this->content_mark,
    		'meta_title' => $this->meta_title,
    		'meta_keyword' => $this->meta_keyword,
    		'meta_description' => $this->meta_description,
    		'status' => (int)$this->status,
    	];
    }

}
