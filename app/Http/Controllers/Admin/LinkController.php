<?php
namespace App\Http\Controllers\Admin;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Service\Admin\LinkService;
use App\Http\Requests\LinkRequest;
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

    public function create()
    {
      return view('admin.link.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(LinkRequest $request)
    {
        $this->link->storeLink($request->all());
        return redirect('admin/link');
    }

    public function edit($id)
    {
      $link = $this->link->editView($id);
      return view('admin.link.edit')->with(['link' => $link['data']]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(LinkRequest $request, $id)
    {
        $attributes = $request->all();
        $this->link->updateLink($attributes,$id);
        return redirect('admin/link');
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
        return redirect('admin/link');
    }
}
