<?php
return [
	// 自定义登录字段
	'username' 	=> 'username',
	// 重置用户密码
	'reset' 	=> '123456',
	// 分页
	'list' => [
		'start'=> 0,
		'length' => 10,
	],
	'paginate' => 1,
	/**
	 * 全局状态
	 * active 	正常
	 * ban 		禁用
	 * addit 	待审核
	 * trash	回收站
	 * destory 	彻底删除
	 */
	'status' => [
		'active' => 1,
		'ban' => 2,
		'audit' => 3,
		'trash' => 99,
		'destory' => -1
	],
	'permission' => [
		// 控制是否显示查看按钮
		'show' => false,
	],
	'role' => [
		// 控制是否显示查看按钮
		'show' => true,
	],
	'user' => [
		// 控制是否显示查看按钮
		'show' => true,
	],
	'tag' => [
		// 控制是否显示查看按钮
		'show' => false,
	],
	'article' => [
		// 控制是否显示查看按钮
		'show' => true,
	],
	'encrypt' => [
		'main' 		=> false,
		'article'	=> true,
		'link'		=> true,
		'category'	=> true,
		'tag'		=> true,

	],
	// 缓存
	'cache' => [
		'menuList' => 'menuList',// 后台菜单缓存
		'categoryList' => 'categoryList',// 前端分类缓存
		'link' => 'link',// 友情链接缓存
	],
	'redis' => [
		'zset' => 'iwanli:trending_articles',
		'hash' => 'iwanli:article.',
	],
	'imagePath' => 'iwanli/image/',
	'blog' => 'blog.system',
	// 博客网站设置
	'setting' => [
		'title' => 'i晚黎博客',
		'keywords' => '晚黎,博客,Laravel,PHP,框架,教程,资源,学习,笔记,iwanli',
		'description' => 'i晚黎博客致力于提供优质学习资源,分享个人笔记、视频教程。',
		'author' => 'http://iwanli.me',
		'about_title' => '碎碎念念的话，伴随着成长',
		'about_en_title' => 'Story About Me',
		'about_content' => '<p>时间真的好快，嗖的一下就长成了今天这模样。永远不会像《挪威森林》村上写的那一句话：一直以为十八岁之后是十九岁，十九岁后是十八岁，如此反复。如今说好的十八岁离开好几年了，好宅不代表着我老，如果认真的去做的更好，只是个开始。如今过的日子并不好过的话，完全可以付出更多的努力再来活一次，找到真正想要的自己。</p><p>执着的去做，不怕舍不得睡觉、玩乐、安逸的时间去拼，要知道现在的痛苦和难受都是以前放弃了太多努力。所以现在要抓紧努力，哪怕需要你花全部精力。去拼，如果没有天分，就用时间去换，走得再慢也不要后退。希望再过几年真的被喊叔叔的年纪，那时候回头感谢一下现在选择拼搏的我。</p><p>没有天分，就用时间去换......</p>',
		// 联系QQ
		'contact_qq' => '',
		// 联系邮箱
		'contact_email' => '',
		// 支付宝赞助
		'sponsor_alipay' => '',
		// 微信赞助
		'sponsor_wechat' => '',
		// 版权
		'copyright' => 'Copyright &#169; 2016 iWanli. All Rights Reserved.',
		// 统计代码
		'statistics' => '',
		// 第三方评论，为空时启用博客自带评论
		'comment' => '',
		// 分享代码
		'share' => '',
	],
];