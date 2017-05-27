<?php
namespace App\Http\Controllers\Admin;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Traits\QiniuTrait;
class MediaController extends Controller
{

    use QiniuTrait;

    public function __construct()
    {
        // 自定义权限中间件
        $this->middleware('check.permission:media');
    }
    /**
     * 七牛资源图片
     * @author 晚黎
     * @date   2016-12-16T12:36:41+0800
     * @return [type]                   [description]
     */
    public function index()
    {
        $images = $this->allFiles(config('admin.global.imagePath'));
        if ($images) {
            $length = count($images) % 4 == 0 ? count($images) / 4 : (count($images) / 4) + 1;
            $images = collect($images)->chunk($length);
        }
        return view('admin.media.list')->with(compact('images'));
    }

    /**
     * 删除图片
     * @author 晚黎
     * @date   2016-12-16T18:12:52+0800
     * @param  [type]                   $id [description]
     * @return [type]                       [description]
     */
    public function destroy($img)
    {
        $isDelete = $this->deleteFile(config('admin.global.imagePath').$img);
        return response()->json(['status' => $isDelete]);
    }
}
