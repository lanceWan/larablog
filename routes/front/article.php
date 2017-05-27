<?php
$router->group(['prefix' => 'article'],function ($router)
{
	$router->get('{id}.html','ArticleController@show');
});