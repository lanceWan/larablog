<?php
namespace App\Presenters\Front;

class IndexPresenter
{
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
}