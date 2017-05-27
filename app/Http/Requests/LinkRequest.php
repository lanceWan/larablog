<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LinkRequest extends FormRequest
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
         $rules['url'] = 'required';
         if (request()->isMethod('POST')) {
             $rules['name'] = 'required|unique:links,name';
         }else{
             // 修改时 request()->method() 方法返回的是 PUT或PATCH
             $rules['name'] = 'required|unique:links,name,'.$this->id;
             $rules['id'] = 'required';
         }
         return $rules;
     }

     /**
      * 验证信息
      * @author 晚黎
      * @date   2016-11-02T10:25:59+0800
      * @return [type]                   [description]
      */
     public function messages()
     {
         return [
             'required'  => trans('validation.required'),
             'unique'    => trans('validation.unique'),
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
             'id'    => trans('admin/link.model.id'),
             'name'  => trans('admin/link.model.name'),
             'url'  => trans('admin/link.model.url'),
         ];
     }
}
