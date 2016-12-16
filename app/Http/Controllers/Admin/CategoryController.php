<?php
namespace App\Http\Controllers\Admin;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Service\Admin\CategoryService;
use App\Http\Requests\CategoryReuqest;
class CategoryController extends Controller
{
    protected $category;

    public function __construct(CategoryService $category)
    {
        $this->middleware('check.permission:category');
        $this->category = $category;
    }
    /**
     * 分类首页
     * @author 晚黎
     * @date   2016-12-08T16:39:22+0800
     * @return [type]                   [description]
     */
    public function index()
    {
        $categories = $this->category->getCategoryList();
        return view('admin.category.list')->with(compact('categories'));
    }

    /**
     * 添加视图
     * @author 晚黎
     * @date   2016-12-09T10:11:27+0800
     * @return [type]                   [description]
     */
    public function create()
    {
        $categories = $this->category->getCategoryList();
        return view('admin.category.create')->with(compact('categories'));
    }

    /**
     * 添加分类
     * @author 晚黎
     * @date   2016-12-09T10:11:16+0800
     * @param  CategoryReuqest          $request [description]
     * @return [type]                            [description]
     */
    public function store(CategoryReuqest $request)
    {
        $responseData = $this->category->storeCategory($request->all());
        return response()->json($responseData);
    }

    /**
     * 查看分类
     * @author 晚黎
     * @date   2016-12-09T10:11:02+0800
     * @param  [type]                   $id [description]
     * @return [type]                       [description]
     */
    public function show($id)
    {
        $categories = $this->category->getCategoryList();
        $category = $this->category->findCategoryById($id);
        return view('admin.category.show')->with(compact('category','categories'));
    }

    /**
     * 修改视图
     * @author 晚黎
     * @date   2016-12-09T10:10:56+0800
     * @param  [type]                   $id [description]
     * @return [type]                       [description]
     */
    public function edit($id)
    {
        $category = $this->category->findCategoryById($id);
        $categories = $this->category->getCategoryList();
        return view('admin.category.edit')->with(compact('category','categories'));
    }

    /**
     * 修改分类
     * @author 晚黎
     * @date   2016-12-09T10:10:45+0800
     * @param  Request                  $request [description]
     * @param  [type]                   $id      [description]
     * @return [type]                            [description]
     */
    public function update(Request $request, $id)
    {
        $responseData = $this->category->updateCategory($request->all(),$id);
        return response()->json($responseData);
    }

    /**
     * 删除分类
     * @author 晚黎
     * @date   2016-12-09T10:10:36+0800
     * @param  [type]                   $id [description]
     * @return [type]                       [description]
     */
    public function destroy($id)
    {
        $this->category->destroyCategory($id);
        return redirect('admin/category');
    }
    /**
     * 分类排序
     * @author 晚黎
     * @date   2016-12-09T10:10:15+0800
     * @return [type]                   [description]
     */
    public function orderable()
    {
        $responseData = $this->category->orderable(request('nestable',''));
        return response()->json($responseData);
    }
}
