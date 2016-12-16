<?php
namespace App\Service\Admin;
use App\Repositories\Eloquent\TagRepositoryEloquent;
use App\Traits\SendSystemErrorTrait;
use Exception;
/**
* 权限service
*/
class TagService
{
	use SendSystemErrorTrait;
	protected $tag;

	function __construct(TagRepositoryEloquent $tag)
	{
		$this->tag =  $tag;
	}
	/**
	 * datatables获取数据
	 * @author 晚黎
	 * @date   2016-11-02T10:31:46+0800
	 * @return [type]                   [description]
	 */
	public function ajaxIndex()
	{
		// datatables请求次数
		$draw = request('draw', 1);
		// 开始条数
		$start = request('start', config('admin.golbal.list.start'));
		// 每页显示数目
		$length = request('length', config('admin.golbal.list.length'));
		// datatables是否启用模糊搜索
		$search['regex'] = request('search.regex', false);
		// 搜索框中的值
		$search['value'] = request('search.value', '');
		// 排序
		$order['name'] = request('columns.' .request('order.0.column',0) . '.name');
		$order['dir'] = request('order.0.dir','asc');

		$result = $this->tag->getTagList($start,$length,$search,$order);

		$tags = [];

		if ($result['tags']) {
			foreach ($result['tags'] as $v) {
				$v->actionButton = $v->getActionButtonAttribute();
				$tags[] = $v;
			}
		}

		return [
			'draw' => $draw,
			'recordsTotal' => $result['count'],
			'recordsFiltered' => $result['count'],
			'data' => $tags,
		];
	}
	/**
	 * 添加权限
	 * @author 晚黎
	 * @date   2016-12-09T11:24:56+0800
	 * @param  [type]                   $formData [表单中所有的数据]
	 * @return [type]                             [true or false]
	 */
	public function storeTag($formData)
	{
		try {
			$result = $this->tag->create($formData);
			flash_info($result,trans('admin/alert.tag.create_success'),trans('admin/alert.tag.create_error'));
			return $result;
		} catch (Exception $e) {
			// 错误信息发送邮件
			$this->sendSystemErrorMail(env('MAIL_SYSTEMERROR',''),$e);
			return false;
		}
	}
	/**
	 * 根据ID获取权限数据
	 * @author 晚黎
	 * @date   2016-11-02T11:44:36+0800
	 * @param  [type]                   $id [权限id]
	 * @return [type]                       [查询出来的权限对象，查不到数据时跳转404]
	 */
	public function editView($id)
	{
		$permission =  $this->tag->skipPresenter()->find($id);
		if ($permission) {
			return $permission;
		}
		abort(404);
	}
	/**
	 * 修改标签
	 * @author 晚黎
	 * @date   2016-12-09T11:31:36+0800
	 * @param  [type]                   $attributes [表单数据]
	 * @param  [type]                   $id         [resource路由传递过来的id]
	 * @return [type]                               [true or false]
	 */
	public function updateTag($attributes,$id)
	{
		// 防止用户恶意修改表单id，如果id不一致直接跳转500
		if ($attributes['id'] != $id) {
			abort(500);
		}
		try {
			$result = $this->tag->update($attributes,$id);
			flash_info($result,trans('admin/alert.tag.edit_success'),trans('admin/alert.tag.edit_error'));
			return $result;
		} catch (Exception $e) {
			// 错误信息发送邮件
			$this->sendSystemErrorMail(env('MAIL_SYSTEMERROR',''),$e);
			return false;
		}
	}
	/**
	 * 标签暂不做状态管理，直接删除
	 * @author 晚黎
	 * @date   2016-12-09T11:32:04+0800
	 * @param  [type]                   $id [标签id]
	 * @return [type]                       [description]
	 */
	public function destroyTag($id)
	{
		try {
			$result = $this->tag->delete($id);
			flash_info($result,trans('admin/alert.tag.destroy_success'),trans('admin/alert.tag.destroy_error'));
			return $result;
		} catch (Exception $e) {
			// 错误信息发送邮件
			$this->sendSystemErrorMail(env('MAIL_SYSTEMERROR',''),$e);
			return false;
		}
		
	}
}