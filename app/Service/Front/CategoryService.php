<?php
namespace App\Service\Front;
use App\Repositories\Eloquent\ArticleRepositoryEloquent;
use App\Repositories\Eloquent\CategoryRepositoryEloquent;
use App\Repositories\Eloquent\ArticleCategoryRepositoryEloquent;
use App\Repositories\Criteria\FilterStatusCriteria;
use App\Repositories\Criteria\FilterArticleIdsCriteria;
use App\Traits\EncryptIdsTrait;
use App\Traits\SendSystemErrorTrait;
use Exception;
class CategoryService
{
	use SendSystemErrorTrait,EncryptIdsTrait;
	protected $article;
	protected $category;
	protected $articleCategory;

	function __construct(ArticleRepositoryEloquent $article,CategoryRepositoryEloquent $category, ArticleCategoryRepositoryEloquent $articleCategory)
	{
		$this->article =  $article;
		$this->category =  $category;
		$this->articleCategory =  $articleCategory;
	}

	public function getArticleList($categoryId)
	{
		try {
			$this->setEncryptConnection('category');
			// id解密
			$categoryId = $this->decodeId($categoryId);
			$category = $this->category->skipPresenter()->find($categoryId);
			$articleCategory = $this->articleCategory->findWhere(['category_id' => $categoryId]);
			$articleIds = [];
			if (!$articleCategory->isEmpty()) {
				$articleIds = $articleCategory->pluck('article_id');
			}
			$this->article->pushCriteria(new FilterStatusCriteria(config('admin.global.status.active')));
			$this->article->pushCriteria(new FilterArticleIdsCriteria($articleIds));
			$articles = $this->article->orderBy('created_at', 'desc')->skipPresenter()->paginate(config('admin.global.paginate'));
			return compact('articles','category');
		} catch (Exception $e) {
			// 错误信息发送邮件
			$this->sendSystemErrorMail(env('MAIL_SYSTEMERROR',''),$e);
			return false;
		}
	}
}