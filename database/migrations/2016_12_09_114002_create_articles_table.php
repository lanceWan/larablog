<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateArticlesTable extends Migration
{

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('articles', function(Blueprint $table) {
            $table->increments('id');
            $table->string('title')->default('')->comment('标题');
            $table->string('author')->default('')->comment('作者');
            $table->text('lead')->comment('摘要');
            $table->string('banner')->default('')->comment('文章banner');
            $table->text('content_html')->comment('文章内容-html格式');
            $table->text('content_mark')->comment('文章内容-markdown格式');
            $table->string('meta_title')->default('')->comment('SEO标题');
            $table->string('meta_keyword')->default('')->comment('SEO关键字');
            $table->string('meta_description')->default('')->comment('SEO描述');
            $table->tinyInteger('status')->default(3)->comment('状态');
            $table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('articles');
	}

}
