<?php
namespace App\Presenters\Front;

class IndexPresenter
{
    /**
     * 文章列表渲染
     * @author 晚黎
     * @date   2017-02-27T11:24:04+0800
     * @param  [type]                   $articles [description]
     * @return [type]                             [description]
     */
	public function articleList($articles)
	{
		$str = '';

		if (!$articles->isEmpty()) {
			foreach ($articles as $article) {
				$banner = '';
				if ($article->banner) {
					$banner .= <<<Eof
					<div class="starImg">
                        <a href="http://iwanli.me/article/56"><img class="img-responsive margin-b-10" src="{$article->banner}" alt="{$article->title}"></a>
                    </div>
Eof;
				}
				$str .= <<<Eof
				<div class="col-md-12 grid-item">
                    <article class="blog-grid">
                        <div class="blog-grid-box-shadow">
                            <div class="blog-grid-content">
                                <h2 class="blog-grid-title-md"><a href="http://iwanli.me/article/56">{$article->title}</a></h2>
                                {$banner}
                                {$article->lead}
                            </div>
                            <div class="blog-grid-supplemental">
                                <span class="blog-grid-supplemental-title">
                                    <a class="blog-grid-supplemental-category" href="http://iwanli.me/cate/4"><i class="fa fa-leaf"></i> Laravel</a>
                                     -  <i class="fa fa-clock-o"></i> {$article->created_at}
                                </span>
                                <span class="blog-grid-supplemental-title pull-right">
                                    <i class="fa fa-fire"></i> 1027
                                </span>
                            </div>
                        </div>
                    </article>
                </div>
Eof;
			}
		}
		return $str;
	}

    public function categoriesList($categories)
    {
        $str = '';
        if ($categories) {
            foreach ($categories as $category) {
                $icon = $category['icon'] ? '<i class="'.$category['icon'].'"></i> ':'';
                $url = $category['url'] ? $category['url'] : url('category/'.$category['id']);
                $target = $category['url'] ? 'target="_blank"':'';
                if ($category['child']) {
                    $str .= <<<Eof
                    <li class="nav-item dropdown">
                        <a class="nav-item-child dropdown-toggle radius-3" {$target} href="{$url}" data-toggle="dropdown">
                            {$icon}{$category['name']}
                        </a>
                        {$this->childCategoryList($category['child'])}
                    </li>
Eof;
                }else{
                    $str .= <<<Eof
                    <li class="nav-item">
                        <a class="nav-item-child radius-3" {$target} href="{$url}">
                            {$icon}{$category['name']}
                        </a>
                    </li>
Eof;
                }
            }
        }
        return $str;
    }

    private function childCategoryList($categories)
    {
        $str = '<ul class="dropdown-menu">';
        foreach ($categories as $category) {
            $icon = $category['icon'] ? '<i class="'.$category['icon'].'"></i> ':'';
            $url = $category['url'] ? $category['url'] : url('category/'.$category['id']);
            $target = $category['url'] ? 'target="_blank"':'';
            $str .= <<<Eof
            <li class="dropdown-menu-item"><a class="dropdown-menu-item-child" {$target} href="{$url}">{$icon}{$category['name']}</a></li>
Eof;
        }
        return $str .= '</ul>';
    }
}