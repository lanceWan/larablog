<?php
namespace App\Http\Controllers\Admin;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Service\Admin\SettingService;
class SettingController extends Controller
{
    protected $setting;
    public function __construct(SettingService $setting)
    {
        $this->middleware('check.permission:blog');
        $this->setting = $setting;
    }
    
    /**
     * 网站设置首页
     * @author 晚黎
     * @date   2016-12-15T13:09:10+0800
     * @return [type]                   [description]
     */
    public function index()
    {
        $setting = $this->setting->index();
        return view('admin.setting.list')->with(compact('setting'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->setting->storeSetting($request);
        return redirect('admin/setting');
    }
}
