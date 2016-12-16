<?php
$router->group(['prefix' => 'media'],function ($router)
{
	$router->get('/','MediaController@index')->name('blog.media');
});