<?php
namespace App\Traits;
trait ActionButtonAttributeTrait
{
	/**
	 * 查看按钮
	 * @author 晚黎
	 * @date   2016-10-31T18:14:09+0800
	 * @param  boolean		$type [默认为跳转页面查看信息,false时<a>标签带上modal样式]
	 * @return [type]
	 */
	public function getShowActionButton($type = true)
	{
		//开启查看按钮
		if (config('admin.global.'.$this->action.'.show')) {
			if (auth()->user()->can(config('admin.permissions.'.$this->action.'.show'))) {
				$id = isset($this->encodeId) ? $this->encodeId:$this->id;
				if ($type) {
					return '<a href="'.url('admin/'.$this->action.'/'.$id).'" class="btn btn-xs btn-outline btn-info tooltips" data-toggle="tooltip" data-original-title="' . trans('admin/action.actionButton.show') . '"  data-placement="top"><i class="fa fa-eye"></i></a> ';
				}
				return '<a href="'.url('admin/'.$this->action.'/'.$id).'" class="btn btn-xs btn-info tooltips" data-toggle="modal" data-target="#myModal" data-original-title="' . trans('admin/action.actionButton.show') . '"  data-placement="top"><i class="fa fa-eye"></i></a> ';
			}
			return '';
		}
		return '';
	}

	public function getArticleShowButton()
	{
		//开启查看按钮
		if (config('admin.global.'.$this->action.'.show')) {
			if (auth()->user()->can(config('admin.permissions.'.$this->action.'.show'))) {
				$id = isset($this->encodeId) ? $this->encodeId:$this->id;
				return '<a href="'.url($this->action.'/'.$id.'.html').'" class="btn btn-xs btn-info btn-outline tooltips" data-original-title="' . trans('admin/action.actionButton.show') . '" target="_blank" data-placement="top"><i class="fa fa-eye"></i></a> ';
				
			}
			return '';
		}
		return '';
	}

	/**
	 * 修改按钮
	 * @author 晚黎
	 * @date   2016-10-31T18:13:50+0800
	 * @return [type]
	 */
	public function getEditActionButton()
	{
		if (auth()->user()->can(config('admin.permissions.'.$this->action.'.edit'))) {
			$id = isset($this->encodeId) ? $this->encodeId:$this->id;
			return '<a href="'.url('admin/'.$this->action.'/'.$id.'/edit').'" class="btn btn-xs btn-outline btn-warning tooltips" data-original-title="' . trans('admin/action.actionButton.edit') . '"  data-placement="top"><i class="fa fa-edit"></i></a> ';
		}
		return '';
	}

	/**
	 * 彻底删除按钮
	 * @author 晚黎
	 * @date   2016-10-31T18:14:39+0800
	 * @param  boolean
	 * @return [type]
	 */
	public function getDestroyActionButton()
	{
		if (auth()->user()->can(config('admin.permissions.'.$this->action.'.destroy'))) {
			$id = isset($this->encodeId) ? $this->encodeId:$this->id;
			return '<a href="javascript:;" onclick="return false" class="btn btn-xs btn-outline btn-danger tooltips destroy_item" data-original-title="' . trans('admin/action.actionButton.destroy') . '"  data-placement="top"><i class="fa fa-trash"></i><form action="'.url('admin/'.$this->action.'/'.$id).'" method="POST" name="delete_item" style="display:none"><input type="hidden" name="_method" value="delete"><input type="hidden" name="_token" value="'.csrf_token().'"></form></a> ';
		}
		return '';
	}
	/**
	 * 重置用户密码
	 * @author 晚黎
	 * @date   2016-10-31T18:14:48+0800
	 * @return [type]
	 */
	public function getResetActionButton()
	{
		if (auth()->user()->can(config('admin.permissions.'.$this->action.'.reset'))) {
			$id = isset($this->encodeId) ? $this->encodeId:$this->id;
			return '<a href="javascript:;" data-id="'.$id.'" class="btn btn-outline btn-xs btn-default tooltips reset_password" data-container="body" data-original-title="' . trans('admin/action.actionButton.reset') . '"  data-placement="top"><i class="fa fa-lock"></i></a> ';
		}
		return '';
	}
	/**
	 * 发布文章
	 * @author 晚黎
	 * @date   2016-12-14T09:53:42+0800
	 * @return [type]                   [description]
	 */
	public function getPushActionButton()
	{
		if (auth()->user()->can(config('admin.permissions.'.$this->action.'.push')) && $this->status == config('admin.global.status.audit')) {
			$id = isset($this->encodeId) ? $this->encodeId:$this->id;
			return '<a href="'.url('admin/'.$this->action.'/push/'.$id).'" class="btn btn-xs btn-outline btn-primary tooltips"  data-original-title="' . trans('admin/action.actionButton.push') . '" data-placement="top"><i class="fa fa-send"></i></a> ';
		}
		return '';
	}
	/**
	 * 待审核
	 * @author 晚黎
	 * @date   2016-12-14T09:53:32+0800
	 * @return [type]                   [description]
	 */
	public function getAuditActionButton()
	{
		if (auth()->user()->can(config('admin.permissions.'.$this->action.'.audit')) && $this->status == config('admin.global.status.active')) {
			$id = isset($this->encodeId) ? $this->encodeId:$this->id;
			return '<a href="'.url('admin/'.$this->action.'/audit/'.$id).'" class="btn btn-xs btn-outline btn-warning tooltips"  data-original-title="' . trans('admin/action.actionButton.audit') . '" data-placement="top"><i class="fa fa-warning"></i></a> ';
		}
		return '';
	}
	
	/**
	 * 获取按钮
	 * @author 晚黎
	 * @date   2016-10-31T18:14:57+0800
	 * @param  boolean
	 * @return [type]
	 */
	public function getActionButtonAttribute($showType = true)
	{
		return $this->getShowActionButton($showType).
				$this->getResetActionButton().
				$this->getEditActionButton().
				$this->getDestroyActionButton();
	}

	/**
	 * 文章列表
	 * @author 晚黎
	 * @date   2016-12-14T09:54:47+0800
	 * @return [type]                   [description]
	 */
	public function getArticleActionButton()
	{
		return $this->getArticleShowButton().
				$this->getAuditActionButton().
				$this->getPushActionButton().
				$this->getEditActionButton().
				$this->getDestroyActionButton();
	}
}