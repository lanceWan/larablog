<?php
namespace App\Presenters\Front;
use App\Traits\EncryptIdsTrait;
use App\Traits\RedisOperationTrait;
class BlogPresenter
{
    use EncryptIdsTrait, RedisOperationTrait;
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
            $this->setEncryptConnection('article');
			foreach ($articles as $article) {
				$banner = '';
                $url = url('article/'.$this->encodeId($article->id).'.html');
                if ($article->banner) {
                    $banner .= <<<Eof
                    <div class="starImg">
                        <a href="{$url}"><img class="img-responsive margin-b-10" src="{$article->banner}" alt="{$article->title}"></a>
                    </div>
Eof;
                }
                $visits = $this->hgetVisits($article->id, 'visits');
				$str .= <<<Eof
				<div class="col-md-12 grid-item">
                    <article class="blog-grid">
                        <div class="blog-grid-box-shadow">
                            <div class="blog-grid-content">
                                <h2 class="blog-grid-title-md"><a href="{$url}">{$article->title}</a></h2>
                                {$banner}
                                {$article->lead}
                            </div>
                            <div class="blog-grid-supplemental">
                                <span class="blog-grid-supplemental-title">
                                    {$this->articleCategory($article->category)} - <i class="fa fa-clock-o"></i> {$article->created_at}
                                </span>
                                <span class="blog-grid-supplemental-title pull-right">
                                    <i class="fa fa-fire"></i> {$visits}
                                </span>
                            </div>
                        </div>
                    </article>
                </div>
Eof;
			}
		}else{
            $str = <<<Eof
            <div class="col-md-12 grid-item">
                    <article class="blog-grid">
                        <div class="blog-grid-box-shadow">
                            <div class="blog-grid-content">
                                暂无文章
                            </div>
                        </div>
                    </article>
                </div>
Eof;
        }
		return $str;
	}
    /**
     * 文章所属分类
     * @author 晚黎
     * @date   2017-02-27T15:01:04+0800
     * @param  [type]                   $category [description]
     * @return [type]                             [description]
     */
    private function articleCategory($category)
    {
        $str = '<i class="fa fa-leaf"></i>';
        $this->setEncryptConnection('category');
        foreach ($category as $v) {
            $str .= '<a class="blog-grid-supplemental-category" href="'.url('category/'.$this->encodeId($v->id).'.html').'"> '.$v->name.'</a>,';
        }
        return rtrim($str,',');
    }

    /**
     * 首页分类导航
     * @author 晚黎
     * @date   2017-02-27T13:42:40+0800
     * @param  [type]                   $categories [description]
     * @return [type]                               [description]
     */
    public function categoriesList($categories)
    {
        $str = '';
        if ($categories) {
            $this->setEncryptConnection('category');
            foreach ($categories as $category) {
                $icon = $category['icon'] ? '<i class="'.$category['icon'].'"></i> ':'';
                $url = $category['url'] ? $category['url'] : url('category/'.$this->encodeId($category['id']).'.html');
                $target = $category['url'] ? 'target="_blank"':'';
                if ($category['child']) {
                    $str .= <<<Eof
                    <li class="nav-item dropdown">
                        <a class="nav-item-child dropdown-toggle radius-3" href="javascript:void(0);" data-toggle="dropdown">
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
    /**
     * 子分类
     * @author 晚黎
     * @date   2017-02-27T13:42:54+0800
     * @param  [type]                   $categories [description]
     * @return [type]                               [description]
     */
    private function childCategoryList($categories)
    {
        $this->setEncryptConnection('category');
        $str = '<ul class="dropdown-menu">';
        foreach ($categories as $category) {
            $icon = $category['icon'] ? '<i class="'.$category['icon'].'"></i> ':'';
            $url = $category['url'] ? $category['url'] : url('category/'.$this->encodeId($category['id']).'.html');
            $target = $category['url'] ? 'target="_blank"':'';
            $str .= <<<Eof
            <li class="dropdown-menu-item"><a class="dropdown-menu-item-child" {$target} href="{$url}">{$icon}{$category['name']}</a></li>
Eof;
        }
        return $str .= '</ul>';
    }
    /**
     * 友情链接列表
     * @author 晚黎
     * @date   2017-02-27T14:27:43+0800
     * @param  [type]                   $links [description]
     * @return [type]                          [description]
     */
    public function linkList($links)
    {
        $str = '';
        if ($links) {
            foreach ($links as $link) {
                $str .= '<li><i class="lists-item-element fa fa-angle-right"></i> <a target="_blank" href="'.$link['url'].'">'.$link['name'].'</a></li>';
            }
        }
        return $str;
    }

    /**
     * 文章详情页分类显示
     * @author 晚黎
     * @date   2017-02-27T17:06:22+0800
     * @param  [type]                   $categories [description]
     * @return [type]                               [description]
     */
    public function postDetailCategories($categories)
    {
        $str = '';
        $this->setEncryptConnection('category');
        foreach ($categories as $category) {
            $str .= '<li><a href="'.url('category/'.$this->encodeId($category->id).'.html').'">'.$category->name.'</a></li>';
        }
        return $str;
    }

    /**
     * 文章标签显示
     * @author 晚黎
     * @date   2017-02-27T17:11:00+0800
     * @param  [type]                   $tags [description]
     * @return [type]                         [description]
     */
    public function postDetailTags($tags)
    {
        $str = '';
        $this->setEncryptConnection('tag');
        foreach ($tags as $tag) {
            $str .= '<li><a href="'.url('tag/'.$this->encodeId($tag->id).'.html').'">'.$tag->name.'</a></li>';
        }
        return $str;

    }

    /**
     * 推荐文章列表
     * @author 晚黎
     * @date   2017-03-01T17:06:26+0800
     * @param  [type]                   $recommendedArticles [description]
     * @return [type]                                        [description]
     */
    public function recommendedArticleList($recommendedArticles)
    {
        $str = '';
        if ($recommendedArticles) {
            $this->setEncryptConnection('article');
            foreach ($recommendedArticles as $article) {
                $article = json_decode($article,true);
                $url = url('article/'.$this->encodeId($article['id']).'.html');
                $str .= <<<Eof
                <li class="timeline-v2-list-item">
                    <i class="timeline-v2-badge-icon radius-circle fa fa-calendar"></i>
                    <small class="timeline-v2-news-date">{$article['updated_at']}</small>
                    <h5 class="timeline-v2-news-title"><a href="{$url}">{$article['title']}</a></h5>
                </li>
Eof;
            }
        }
        return $str;
    }
}