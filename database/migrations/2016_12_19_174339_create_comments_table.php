<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCommentsTable extends Migration
{

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('comments', function(Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->default(0)->comment('评论人ID');
            $table->integer('pid')->default(0)->comment('层级关系');
            $table->text('content')->comment('评论内容');
            $table->integer('lidx')->default(0)->index()->comment('左侧索引');
            $table->integer('ridx')->default(0)->index()->comment('右侧索引');
            $table->integer('depth')->default(0)->comment('层级');
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
		Schema::drop('comments');
	}

}
