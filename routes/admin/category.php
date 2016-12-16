<?php
$router->group(['prefix' => 'category'],function ($router)
{
	$router->get('orderable','CategoryController@orderable')->name('category.orderable');
});
$router->resource('category','CategoryController');