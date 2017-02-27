<?php
namespace App\Service\Front;
use App\Repositories\Eloquent\ArticleRepositoryEloquent;
use App\Repositories\Eloquent\CategoryRepositoryEloquent;
use App\Traits\EncryptIdsTrait;
use App\Traits\SendSystemErrorTrait;
use Exception;
class ArticleService
{
	use SendSystemErrorTrait,EncryptIdsTrait;
	protected $article;
	protected $category;

	function __construct(ArticleRepositoryEloquent $article,CategoryRepositoryEloquent $category)
	{
		$this->article =  $article;
		$this->category =  $category;
	}

	public function postDetail($articleId)
	{
		try {
			$this->setEncryptConnection('article');
			// id解密
			$articleId = $this->decodeId($articleId);
			$article = $this->article->with('tag','category')->skipPresenter()->find($articleId);
			return compact('article');
		} catch (Exception $e) {
			dd($e);
			// 错误信息发送邮件
			$this->sendSystemErrorMail(env('MAIL_SYSTEMERROR',''),$e);
			return false;
		}
	}
}