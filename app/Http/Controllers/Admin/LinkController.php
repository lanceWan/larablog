<?php
namespace App\Http\Controllers\Admin;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Service\Admin\LinkService;
class LinkController extends Controller
{
    protected $link;

    public function __construct(LinkService $link)
    {
        $this->middleware('check.permission:link');
        $this->link = $link;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('admin.link.list');
    }

    public function ajaxIndex()
    {
        $responseData = $this->link->ajaxIndex();
        return response()->json($responseData);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $attributes = $request->all();
        $this->link->storeLink($attributes);
        return response()->json(['data' => $attributes['data']]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $attributes = $request->all();
        $this->link->updateLink($attributes,$id);
        return response()->json(['data' => $attributes['data']]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $this->link->destroyLink($id);
        return response()->json(['data' => []]);
    }
}
