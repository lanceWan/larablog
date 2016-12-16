<?php
namespace App\Presenters\Admin;

class ArticlePresenter
{
	/**
	 * 文章分类数据
	 * @author 晚黎
	 * @date   2016-12-12T14:15:20+0800
	 * @param  [type]                   $categories [description]
	 * @return [type]                               [description]
	 */
	public function categoryList($categories,$articleCagegories=[])
	{
		$html = '';
		if ($categories) {
			foreach ($categories as $v) {
				$html .= <<<Eof
				<option value="{$v['id']}" {$this->checkSelected($v['id'],$articleCagegories,'cid')}>{$v['name']}</option>
Eof;
			}
		}
		return $html;
	}

	/**
	 * 标签数据
	 * @author 晚黎
	 * @date   2016-12-12T14:15:09+0800
	 * @param  [type]                   $tags [description]
	 * @return [type]                         [description]
	 */
	public function tagList($tags,$articleTags=[])
	{
		$html = '';
		if ($tags) {
			foreach ($tags as $v) {
				$html .= <<<Eof
				<option value="{$v['id']}" {$this->checkSelected($v['id'],$articleTags,'tags')}>{$v['name']}</option>
Eof;
			}
		}
		return $html;
	}

	private function checkSelected($id,$lists,$name)
	{
		$name = old($name);
		if ($name) {
			return in_array($id,$name) ? 'selected="selected"':'';
		}
		if ($lists) {
			$lists = array_column($lists, 'id');
			if ($name) {
				if (in_array($id,$lists) && in_array($id,$name)) {
					return 'selected="selected"';
				}
			}else{
				return in_array($id,$lists) ? 'selected="selected"':'';
			}
			return '';
		}
		return '';
	}
}