<?php
$router->group(['prefix' => 'tag'],function ($router)
{
	$router->get('ajaxIndex','TagController@ajaxIndex')->name('tag.ajaxIndex');
});
$router->resource('tag','TagController',['except' => ['show']]);