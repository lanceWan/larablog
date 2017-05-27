<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCategoriesTable extends Migration
{

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('categories', function(Blueprint $table) {
            $table->increments('id');
            $table->integer('pid')->default(0)->comment('分类关系');
            $table->string('name')->default('')->comment('分类名称');
            $table->string('url')->default('')->comment('分类外部url，默认为空');
            $table->string('icon',30)->default('')->comment('分类图标');
            $table->tinyInteger('sort')->default(0)->comment('排序');
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
		Schema::drop('categories');
	}

}
