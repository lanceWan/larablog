<?php

namespace App\Http\Controllers\Iwanli;
use App\Service\Front\CategoryService;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CategoryController extends Controller
{
    protected $service;

    public function __construct(CategoryService $service)
    {
        $this->service = $service;
    }
    

    /**
     * 分类列表
     * @author 晚黎
     * @date   2017-02-27T16:19:38+0800
     * @param  [type]                   $id [description]
     * @return [type]                       [description]
     */
    public function show($id)
    {
        $result = $this->service->getArticleList($id);
        return view('front.category.list')->with($result);
    }
    
}
