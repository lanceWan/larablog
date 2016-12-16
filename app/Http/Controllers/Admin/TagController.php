<?php
namespace App\Http\Controllers\Admin;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Service\Admin\TagService;
use App\Http\Requests\TagRequest;
class TagController extends Controller
{
    protected $tag;

    function __construct(TagService $tag)
    {
        $this->middleware('check.permission:tag');
        $this->tag = $tag;
    }

    /**
     * 首页视图
     * @author 晚黎
     * @date   2016-12-09T10:57:32+0800
     * @return [type]                   [description]
     */
    public function index()
    {
        return view('admin.tag.list');
    }
    /**
     * datatable数据
     * @author 晚黎
     * @date   2016-12-09T11:14:44+0800
     * @return [type]                   [description]
     */
    public function ajaxIndex()
    {
        $responseData = $this->tag->ajaxIndex();
        return response()->json($responseData);
    }

    /**
     * 添加视图
     * @author 晚黎
     * @date   2016-12-09T11:23:23+0800
     * @return [type]                   [description]
     */
    public function create()
    {
        return view('admin.tag.create');
    }

    /**
     * 添加标签
     * @author 晚黎
     * @date   2016-12-09T11:23:34+0800
     * @param  Request                  $request [description]
     * @return [type]                            [description]
     */
    public function store(TagRequest $request)
    {
        $this->tag->storeTag($request->all());
        return redirect('admin/tag');
    }

    /**
     * 修改视图
     * @author 晚黎
     * @date   2016-12-09T11:28:21+0800
     * @param  [type]                   $id [description]
     * @return [type]                       [description]
     */
    public function edit($id)
    {
        $tag = $this->tag->editView($id);
        return view('admin.tag.edit')->with(compact('tag'));
    }

    /**
     * 修改标签
     * @author 晚黎
     * @date   2016-12-09T11:30:42+0800
     * @param  TagRequest               $request [description]
     * @param  [type]                   $id      [description]
     * @return [type]                            [description]
     */
    public function update(TagRequest $request, $id)
    {
        $this->tag->updateTag($request->all(),$id);
        return redirect('admin/tag');
    }

    /**
     * 删除标签
     * @author 晚黎
     * @date   2016-12-09T11:33:24+0800
     * @param  [type]                   $id [description]
     * @return [type]                       [description]
     */
    public function destroy($id)
    {
        $this->tag->destroyTag($id);
        return redirect('admin/tag');
    }
}
