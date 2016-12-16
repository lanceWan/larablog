<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ArticleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rules = [
            'cid' => 'required',
            'title' => 'required',
            'author' => 'required',
            'content_mark' => 'required',
            'tags' => 'required',
            'cid' => 'required',
        ];

        return $rules;
    }

    public function messages()
    {
        return [
            'required'  => trans('validation.required'),
        ];
    }
    /**
     * 字段名称
     * @author 晚黎
     * @date   2016-11-02T10:28:52+0800
     * @return [type]                   [description]
     */
    public function attributes()
    {
        return [
            'cid'           => trans('admin/article.model.cid'),
            'title'         => trans('admin/article.model.title'),
            'author'        => trans('admin/article.model.author'),
            'content_html'  => trans('admin/article.model.content_html'),
            'content_mark'  => trans('admin/article.model.content_mark'),
            'tags'        => trans('admin/article.tags'),
            'cid'        => trans('admin/article.model.cid'),
        ];
    }
}
