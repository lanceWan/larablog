<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

Auth::routes();

Route::get('/home', 'HomeController@index');
Route::group(['namespace' => 'Iwanli', 'domain' => 'www.iwanli.me'],function ($router){
	$router->get('/','IndexController@index');
});

Route::group(['namespace' => 'Iwanli', 'domain' => 'blog.iwanli.me'],function ($router){
	$router->get('/','IndexController@blog');
	$router->post('search','IndexController@search');
	$router->get('/test','ArticleController@test');
	require(__DIR__ . '/front/category.php');
	require(__DIR__ . '/front/article.php');
	require(__DIR__ . '/front/tag.php');
});

Route::group(['prefix' => 'admin','namespace' => 'Admin','middleware' => ['auth']],function ($router)
{
	$router->get('/dash','DashboardController@index')->name('system.index');
	$router->get('/i18n', 'DashboardController@dataTableI18n');
	// 权限
	require(__DIR__ . '/admin/permission.php');
	// 角色
	require(__DIR__ . '/admin/role.php');
	// 用户
	require(__DIR__ . '/admin/user.php');
	// 菜单
	require(__DIR__ . '/admin/menu.php');
	// 博客分类
	require(__DIR__ . '/admin/category.php');
	// 标签
	require(__DIR__ . '/admin/tag.php');
	// 文章
	require(__DIR__ . '/admin/article.php');
	// 友情链接
	require(__DIR__ . '/admin/link.php');
	// 网站设置
	require(__DIR__ . '/admin/setting.php');
	// 七牛图片
	require(__DIR__ . '/admin/media.php');

});

// 后台系统日志
Route::group(['prefix' => 'admin/log','middleware' => ['auth','check.permission:log']],function ($router)
{
	$router->get('/','\Arcanedev\LogViewer\Http\Controllers\LogViewerController@index')->name('log.dash');
	$router->get('list','\Arcanedev\LogViewer\Http\Controllers\LogViewerController@listLogs')->name('log.index');
	$router->post('delete','\Arcanedev\LogViewer\Http\Controllers\LogViewerController@delete')->name('log.destroy');
	$router->get('/{date}','\Arcanedev\LogViewer\Http\Controllers\LogViewerController@show')->name('log.show');
	$router->get('/{date}/download','\Arcanedev\LogViewer\Http\Controllers\LogViewerController@download')->name('log.download');
	$router->get('/{date}/{level}','\Arcanedev\LogViewer\Http\Controllers\LogViewerController@showByLevel')->name('log.filter');

});