<?php
namespace App\Service\Front;
use App\Repositories\Eloquent\ArticleRepositoryEloquent;

use App\Repositories\Criteria\FilterStatusCriteria;

use App\Traits\SendSystemErrorTrait;
use Exception;
/**
* 权限service
*/
class IndexService
{
	use SendSystemErrorTrait;
	protected $article;

	function __construct(ArticleRepositoryEloquent $article)
	{
		$this->article =  $article;
	}

	public function getArticleList()
	{
		try {
			$this->article->pushCriteria(new FilterStatusCriteria(config('admin.global.status.active')));
			$articles = $this->article->with('category')->orderBy('created_at', 'desc')->skipPresenter()->paginate(config('admin.global.paginate'));
			// dd($articles->isEmpty(),$articles->total());
			return $articles;
		} catch (Exception $e) {
			// 错误信息发送邮件
			$this->sendSystemErrorMail(env('MAIL_SYSTEMERROR',''),$e);
			return false;
		}
	}
}