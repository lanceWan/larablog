<?php
namespace App\Service\Front;
use App\Repositories\Eloquent\TagRepositoryEloquent;
use App\Repositories\Eloquent\ArticleRepositoryEloquent;
use App\Repositories\Eloquent\ArticleTagRepositoryEloquent;
use App\Repositories\Criteria\FilterStatusCriteria;
use App\Repositories\Criteria\FilterArticleIdsCriteria;
use App\Traits\EncryptIdsTrait;
use App\Traits\SendSystemErrorTrait;
use Exception;
class TagService
{
	use SendSystemErrorTrait,EncryptIdsTrait;
	protected $tag;
	protected $article;
	protected $articleTag;

	function __construct(TagRepositoryEloquent $tag, ArticleRepositoryEloquent $article,ArticleTagRepositoryEloquent $articleTag)
	{
		$this->tag =  $tag;
		$this->article =  $article;
		$this->articleTag =  $articleTag;
	}

	public function tagList($tagId)
	{
		try {
			$this->setEncryptConnection('tag');
			// id解密
			$tagId = $this->decodeId($tagId);
			$tag = $this->tag->skipPresenter()->find($tagId);
			$articleTag = $this->articleTag->findWhere(['tag_id' => $tagId]);
			$articleIds = [];
			if (!$articleTag->isEmpty()) {
				$articleIds = $articleTag->pluck('article_id');
			}
			$this->article->pushCriteria(new FilterStatusCriteria(config('admin.global.status.active')));
			$this->article->pushCriteria(new FilterArticleIdsCriteria($articleIds));
			$articles = $this->article->orderBy('created_at', 'desc')->skipPresenter()->paginate(config('admin.global.paginate'));
			return compact('articles','tag');
		} catch (Exception $e) {
			// 错误信息发送邮件
			$this->sendSystemErrorMail(env('MAIL_SYSTEMERROR',''),$e);
			return false;
		}
	}
}