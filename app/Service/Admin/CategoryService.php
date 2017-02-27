<?php
namespace App\Service\Admin;
use App\Repositories\Eloquent\CategoryRepositoryEloquent;
use App\Traits\CategoryListTrait;
use App\Traits\SendSystemErrorTrait;
use Exception,DB;
/**
* 菜单service
*/
class CategoryService{
	
	use SendSystemErrorTrait,CategoryListTrait;

	protected $category;

	public function __construct(CategoryRepositoryEloquent $category)
	{
		$this->category = $category;
	}
	
	public function getCategoryList()
	{
		$categories = $this->getCategoryFromCache();
		if (empty($categories)) {
			$categoriesData = $this->category->allCategories();
			$categories = $this->sortCategorySetCache($categoriesData);
		}
		return $categories;

	}
	/**
	 * 添加菜单
	 * @author 晚黎
	 * @date   2016-11-04T15:10:32+0800
	 * @param  [type]                   $attributes [表单数据]
	 * @return [type]                               [Boolean]
	 */
	public function storeCategory($attributes)
	{
		try {
			$result = $this->category->create($attributes);
			if ($result) {
				// 更新缓存
				$categoriesData = $this->category->allCategories();
				$this->sortCategorySetCache($categoriesData);
			}
			return [
				'status' => $result,
				'message' => $result ? trans('admin/alert.category.create_success'):trans('admin/alert.category.create_error'),
			];
		} catch (Exception $e) {
			dd($e);
			// 错误信息发送邮件
			$this->sendSystemErrorMail(env('MAIL_SYSTEMERROR',''),$e);
			return false;
		}
	}
	/**
	 * 根据菜单ID查找数据
	 * @author 晚黎
	 * @date   2016-11-04T16:25:59+0800
	 * @param  [type]                   $id [description]
	 * @return [type]                       [description]
	 */
	public function findCategoryById($id)
	{
		$menu = $this->category->skipPresenter()->find($id);
		if ($menu){
			return $menu;
		}
		// TODO替换正查找不到数据错误页面
		abort(404);
	}
	/**
	 * 修改菜单数据
	 * @author 晚黎
	 * @date   2016-11-04
	 * @param  [type]     $attributes [表单数据]
	 * @param  [type]     $id         [resource路由id]
	 * @return [type]                 [Array]
	 */
	public function updateCategory($attributes,$id)
	{
		// 防止用户恶意修改表单id，如果id不一致直接跳转500
		if ($attributes['id'] != $id) {
			return [
				'status' => false,
				'message' => trans('admin/errors.user_error'),
			];
		}
		try {
			$isUpdate = $this->category->update($attributes,$id);
			if ($isUpdate) {
				// 更新缓存
				$categoriesData = $this->category->allCategories();
				$this->sortCategorySetCache($categoriesData);
			}
			return [
				'status' => $isUpdate,
				'message' => $isUpdate ? trans('admin/alert.category.edit_success'):trans('admin/alert.category.edit_error'),
			];
		} catch (Exception $e) {
			// 错误信息发送邮件
			$this->sendSystemErrorMail(env('MAIL_SYSTEMERROR',''),$e);
			return false;
		}
		

	}
	/**
	 * 删除菜单
	 * @author 晚黎
	 * @date   2016-11-04
	 * @param  [type]     $id [菜单ID]
	 * @return [type]         [description]
	 */
	public function destroyCategory($id)
	{
		try {
			$isDestroy = $this->category->delete($id);
			if ($isDestroy) {
				// 更新缓存
				$categoriesData = $this->category->allCategories();
				$this->sortCategorySetCache($categoriesData);
			}
			flash_info($isDestroy,trans('admin/alert.category.destroy_success'),trans('admin/alert.category.destroy_error'));
			return $isDestroy;
		} catch (Exception $e) {
			// 错误信息发送邮件
			$this->sendSystemErrorMail(env('MAIL_SYSTEMERROR',''),$e);
			return false;
		}
	}

	public function orderable($nestableData)
	{
		try {
			$dataArray = json_decode($nestableData,true);
			$menus = array_values($this->getCategoryList());
			$menuCount = count($dataArray);
			$bool = false;
			DB::beginTransaction();
			foreach ($dataArray as $k => $v) {
				$sort = $menuCount - $k;
				if (!isset($menus[$k])) {
					$this->category->update(['sort' => $sort,'pid' => 0],$v['id']);
					$bool = true;
				}else{
					if (isset($menus[$k]['id']) && $v['id'] != $menus[$k]['id']) {
						$this->category->update(['sort' => $sort,'pid' => 0],$v['id']);
						$bool = true;
					}
				}
				if (isset($v['children']) && !empty($v['children'])) {
					$childCount = count($v['children']);
					foreach ($v['children'] as $key => $child) {
						$chidlSort = $childCount - $key;
						if (!isset($menus[$k]['child'][$key])) {
							foreach ($v['children'] as $index => $val) {
								$reIndex = $childCount - $index;
								$this->category->update(['pid' => $v['id'],'sort' => $reIndex],$val['id']);
							}
							$bool = true;
						}else{
							if (isset($menus[$k]['child'][$key]) && ($child['id'] != $menus[$k]['child'][$key]['id'])) {
								$this->category->update(['pid' => $v['id'],'sort' => $chidlSort],$child['id']);
								$bool = true;
							}
						}
					}
				}
			}
			DB::commit();
			if ($bool) {
				// 更新缓存
				$categoriesData = $this->category->allCategories();
				$this->sortCategorySetCache($categoriesData);
			}
			return [
				'status' => $bool,
				'message' => $bool ? trans('admin/alert.category.order_success'):trans('admin/alert.category.order_error')
			];
		} catch (Exception $e) {
			// 错误信息发送邮件
			DB::rollBack();
			$this->sendSystemErrorMail(env('MAIL_SYSTEMERROR',''),$e);
			return false;
		}
	}
}