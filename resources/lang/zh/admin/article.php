<?php
return [
	'title' 	=> '文章管理',
	'desc' 		=> '文章列表',
	'create' 	=> '添加文章',
	'edit' 		=> '修改文章',
	'info' 		=> '文章信息',
	'tags' 		=> '文章标签',
	'new_tags' 	=> '新增标签',
	'push' 		=> '发布文章',
	'model' 	=> [
		'id' 				=> 'ID',
		'cid' 				=> '文章分类',
		'title' 			=> '文章标题',
		'author' 			=> '作者',
		'lead' 				=> '摘要',
		'banner' 			=> '文章banner',
        'content_html' 		=> '文章内容',
        'content_mark' 		=> '文章内容',
        'meta_title' 		=> 'SEO标题',
        'meta_keyword' 		=> 'SEO关键字',
        'meta_description' 	=> 'SEO描述',
        'status' 			=> '文章状态',
        'created_at' 		=> '创建时间',
        'updated_at' 		=> '修改时间',
	],
	'action' => [
		'create' => '<i class="fa fa-plus"></i> 添加文章',
	],

];