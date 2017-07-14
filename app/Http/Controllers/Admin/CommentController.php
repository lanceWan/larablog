<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Comment;
class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // $node = Comment::create(['content' => '这很老铁！']);
        // $node->makeRoot();
        // $child1 = Comment::create(['content' => '隔壁老王来看看']);
        // $child1->makeChildOf($node);
        // $child2 = Comment::create(['content' => '观望中~']);
        // $child2->makeSiblingOf($child1);
        // $node = Comment::find(7);
        // $children = $node->children()->get();
        // dd($children, $node);

        // $node = Comment::find(17);
        // dd($node->getDescendantsAndSelf()->toHierarchy());

        // $node = Comment::create(['content' => '哈哈哈哈']);
        // $node->makeRoot();
        dd(Comment::getNestedList('content','id','|--'));
        foreach($node->getDescendantsAndSelf() as $descendant) {
          echo "{$descendant->id} - {$descendant->content}<br/>";
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
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
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
