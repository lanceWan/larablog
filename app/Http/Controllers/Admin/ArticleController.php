<?php
namespace App\Http\Controllers\Admin;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\ArticleRequest;
use App\Service\Admin\ArticleService;
class ArticleController extends Controller
{
    protected $article;

    public function __construct(ArticleService $article)
    {

        $this->middleware('check.permission:article');
        $this->article = $article;
    }
    /**
     * 首页列表
     * @author 晚黎
     * @date   2016-12-13T11:59:42+0800
     * @return [type]                   [description]
     */
    public function index()
    {
        return view('admin.article.list');
    }

    /**
     * datatable数据
     * @author 晚黎
     * @date   2016-12-13T11:59:30+0800
     * @return [type]                   [description]
     */
    public function ajaxIndex()
    {
        $responseData = $this->article->ajaxIndex();
        return response()->json($responseData);
    }

    /**
     * 添加视图
     * @author 晚黎
     * @date   2016-12-09T14:15:53+0800
     * @return [type]                   [description]
     */
    public function create()
    {
        $resultData = $this->article->createView();
        return view('admin.article.create')->with($resultData);
    }

    /**
     * 添加文章
     * @author 晚黎
     * @date   2016-12-13T11:58:21+0800
     * @param  ArticleRequest           $request [description]
     * @return [type]                            [description]
     */
    public function store(ArticleRequest $request)
    {
        $this->article->storeArticle($request);
        return redirect('admin/article');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $resultData = $this->article->editView($id);
        // dd($resultData);
        return view('admin.article.edit')->with($resultData);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ArticleRequest $request, $id)
    {
        $this->article->updateArticle($request,$id);
        return redirect('admin/article');
    }

    /**
     * 删除文章
     * @author 晚黎
     * @date   2016-12-14T10:19:46+0800
     * @param  [type]                   $id [description]
     * @return [type]                       [description]
     */
    public function destroy($id)
    {
        $this->article->destroyArticle($id);
        return redirect('admin/article');
    }
    /**
     * 草稿箱
     * @author 晚黎
     * @date   2016-12-14T10:15:10+0800
     * @param  [type]                   $id [description]
     * @return [type]                       [description]
     */
    public function audit($id)
    {
        $this->article->mark($id,config('admin.global.status.audit'));
        return redirect('admin/article');
    }
    /**
     * 发布
     * @author 晚黎
     * @date   2016-12-14T10:15:21+0800
     * @param  [type]                   $id [description]
     * @return [type]                       [description]
     */
    public function push($id)
    {
        $this->article->mark($id,config('admin.global.status.active'));
        return redirect('admin/article');
    }
    /**
     * markdown上传图片
     * @author 晚黎
     * @date   2016-12-16T12:34:19+0800
     * @return [type]                   [description]
     */
    public function upload(Request $request)
    {
        $responseData = $this->article->upload($request);
        return response()->json($responseData);
    }
}
