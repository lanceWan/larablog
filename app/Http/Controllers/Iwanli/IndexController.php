<?php
namespace App\Http\Controllers\Iwanli;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Service\Front\IndexService;
class IndexController extends Controller
{
	protected $service;

	public function __construct(IndexService $service)
	{
		$this->service = $service;
	}
	/**
	 * 首页
	 * @author 晚黎
	 * @date   2017-02-24T17:01:26+0800
	 * @return [type]                   [description]
	 */
    public function index()
    {
    	return view('front.index.index');
    }
    /**
     * 博客页面
     * @author 晚黎
     * @date   2017-02-24T17:01:36+0800
     * @return [type]                   [description]
     */
    public function blog()
    {
    	$articles = $this->service->getArticleList();
    	return view('front.index.blog')->with(compact('articles'));
    }

    public function search()
    {
        $result = $this->service->search(request('q',''));
        if ($result) {
            return view('front.index.search')->with($result);
        }
        return redirect('/');
    }
}