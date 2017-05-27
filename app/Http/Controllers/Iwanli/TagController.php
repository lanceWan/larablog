<?php

namespace App\Http\Controllers\Iwanli;

use Illuminate\Http\Request;
use App\Service\Front\TagService;
use App\Http\Controllers\Controller;
class TagController extends Controller
{
	protected $service;

	public function __construct(TagService $service)
	{
		$this->service = $service;
	}
	/**
	 * 标签文章列表
	 * @author 晚黎
	 * @date   2017-02-27T17:45:58+0800
	 * @param  [type]                   $id [description]
	 * @return [type]                       [description]
	 */
    public function show($id)
    {
    	$result = $this->service->tagList($id);
    	return view('front.tag.list')->with($result);
    }
}
