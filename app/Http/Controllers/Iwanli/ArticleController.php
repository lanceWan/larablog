<?php

namespace App\Http\Controllers\Iwanli;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Service\Front\ArticleService;

class ArticleController extends Controller
{
    protected $service;

    public function __construct(ArticleService $service)
    {
        $this->service = $service;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $result = $this->service->postDetail($id);
        return view('front.article.detail')->with($result);
    }

    public function test()
    {
        return $this->service->test();
    }
}
