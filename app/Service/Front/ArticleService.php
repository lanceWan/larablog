<?php
namespace App\Service\Front;
use App\Repositories\Eloquent\ArticleRepositoryEloquent;
use App\Repositories\Eloquent\CategoryRepositoryEloquent;
use App\Traits\EncryptIdsTrait;
use App\Traits\RedisOperationTrait;
use App\Traits\SendSystemErrorTrait;
use Exception;
class ArticleService
{
	use SendSystemErrorTrait,EncryptIdsTrait, RedisOperationTrait;
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
			// 浏览量增加
			$this->hincr($articleId,'visits',1);
			// 文章分数增加
			$this->incrScore(8640, collect([
				'id' => $articleId,
				'title' => $article->title,
				'created_at' => $article->created_at->toDateTimeString(),
			]));
			// 获取文章浏览量
			$visits = $this->hgetVisits($articleId,'visits');
			return compact('article','visits');
		} catch (Exception $e) {
			dd($e);
			// 错误信息发送邮件
			$this->sendSystemErrorMail(env('MAIL_SYSTEMERROR',''),$e);
			return false;
		}
	}

	public function test()
	{
		$articles = $this->article->skipPresenter()->all(['id', 'title', 'created_at']);
		foreach ($articles as $article) {
			$this->incrScore(strtotime($article->created_at),$article);
		}
		return $this->zrevrange();
	}
}