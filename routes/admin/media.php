<?php
$router->group(['prefix' => 'media'],function ($router)
{
	$router->get('/','MediaController@index')->name('media.list');
	$router->get('iwanli/'.config('admin.global.imagePath').'{img}','MediaController@destroy')->name('media.destroy');
});