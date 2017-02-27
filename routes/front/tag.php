<?php
$router->group(['prefix' => 'tag'],function ($router)
{
	$router->get('{id}.html','TagController@show');
});