<?php
namespace App\Service\Admin;
use App\Repositories\Eloquent\LinkRepositoryEloquent;
use App\Traits\SendSystemErrorTrait;
use Exception;
/**
* 权限service
*/
class LinkService
{
	use SendSystemErrorTrait;
	protected $link;

	function __construct(LinkRepositoryEloquent $link)
	{
		$this->link =  $link;
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

		$result = $this->link->getLinkList($start,$length,$search,$order);

		return [
			'draw' => $draw,
			'recordsTotal' => $result['count'],
			'recordsFiltered' => $result['count'],
			'data' =>$result['links'],
		];
	}

	
	/**
	 * 添加友情链接
	 * @author 晚黎
	 * @date   2016-12-15T11:20:50+0800
	 * @param  [type]                   $formData [description]
	 * @return [type]                             [description]
	 */
	public function storeLink($attributes)
	{
		try {
			return $this->link->create($attributes['data'][0]);
		} catch (Exception $e) {
			// 错误信息发送邮件
			$this->sendSystemErrorMail(env('MAIL_SYSTEMERROR',''),$e);
			return false;
		}
	}

	/**
	 * 修改友情链接信息
	 * @author 晚黎
	 * @date   2016-12-15T10:50:04+0800
	 * @param  [type]                   $attributes [description]
	 * @param  [type]                   $id         [description]
	 * @return [type]                               [description]
	 */
	public function updateLink($attributes,$id)
	{
		try {
			return $this->link->update($attributes['data'][$id],$this->link->decodeId($id));
		} catch (Exception $e) {
			// 错误信息发送邮件
			$this->sendSystemErrorMail(env('MAIL_SYSTEMERROR',''),$e);
			return false;
		}
	}
	/**
	 * 删除友情链接
	 * @author 晚黎
	 * @date   2016-12-15T11:35:24+0800
	 * @param  [type]                   $id [description]
	 * @return [type]                       [description]
	 */
	public function destroyLink($id)
	{
		try {
			$ids = explode(',',$id);
			foreach ($ids as &$v) {
				$v = $this->link->decodeId($v);
			}
			return $this->link->delete($ids);
		} catch (Exception $e) {
			// 错误信息发送邮件
			$this->sendSystemErrorMail(env('MAIL_SYSTEMERROR',''),$e);
			return false;
		}
		
	}
}