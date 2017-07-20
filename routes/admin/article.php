<?php
$router->group(['prefix' => 'article'],function ($router)
{
	$router->get('ajaxIndex','ArticleController@ajaxIndex')->name('article.ajaxIndex');
	$router->get('audit/{id}','ArticleController@audit')->name('article.audit');
	$router->get('push/{id}','ArticleController@push')->name('article.push');
	$router->post('upload','ArticleController@markdownImageUpload')->name('article.upload');
});
$router->resource('article','ArticleController');