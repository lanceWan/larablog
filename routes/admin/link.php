<?php
$router->group(['prefix' => 'link'],function ($router)
{
	$router->get('ajaxIndex','LinkController@ajaxIndex')->name('link.ajaxIndex');
});
$router->resource('link','LinkController');
