<?php
namespace App\Traits;
trait CategoryListTrait{
	/**
	 * 递归分类数据
	 * @author 晚黎
	 * @date   2016-12-08T16:03:43+0800
	 * @param  [type]                   $categories [数据库或缓存中查询出来的数据]
	 * @param  integer                  $pid        [菜单关系id]
	 * @return [type]                               [description]
	 */
	public function sortCategories($categories,$pid=0)
	{
		$arr = [];
		if (empty($categories)) {
			return '';
		}

		foreach ($categories as $key => $v) {
			if ($v['pid'] == $pid) {
				$arr[$key] = $v;
				$arr[$key]['child'] = self::sortCategories($categories,$v['id']);
			}
		}
		return $arr;
	}

	/**
	 * 排序子菜单并缓存
	 * @author 晚黎
	 * @date   2016-12-08T16:04:10+0800
	 * @return [type]                   [description]
	 */
	public function sortCategorySetCache($categories)
	{
		if ($categories) {
			$categoryList = $this->sortCategories($categories);
			foreach ($categoryList as $key => &$v) {
				if ($v['child']) {
					$sort = array_column($v['child'], 'sort');
					array_multisort($sort,SORT_DESC,$v['child']);
				}
			}
			// 缓存菜单数据
			cache()->forever(config('admin.global.cache.categoryList'),$categoryList);
			return $categoryList;
			
		}
		return '';
	}
	/**
	 * 获取菜单数据
	 * @author 晚黎
	 * @date   2016-11-04T10:45:38+0800
	 * @return [type]                   [description]
	 */
	public function getCategoryFromCache()
	{
		// 判断数据是否缓存
		if (cache()->has(config('admin.global.cache.categoryList'))) {
			return cache()->get(config('admin.global.cache.categoryList'));
		}
		return '';
	}
}