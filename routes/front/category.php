<?php
$router->group(['prefix' => 'category'],function ($router)
{
	$router->get('{id}.html','CategoryController@show');
});