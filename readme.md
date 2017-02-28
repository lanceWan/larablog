<p align="center"><a href="https://laravel.com" target="_blank"><img width="150"src="https://laravel.com/laravel.png"></a></p>


## 关于Larablog

`Larablog` 是基于 [iDashboard](https://github.com/lanceWan/iDashboard) 后台的博客，在 `iDashboard` 基础上优化了部分代码，有些地方代码和 `iDashboard` 有些不同，理论上是 `iDashboard` 的升级版。

## 项目进度

- [x] 博客相关权限
- [x] 博客分类
- [x] 文章标签管理
- [x] 文章管理
	- [x] 增删改查文章、发布、草稿箱
	- [x] 上传图片到七牛云
	- [x] 同步更新文章分类和标签(多对多)
	- [x] 文章ID根据配置进行加密
	- [x] markdown编辑器上传图片到七牛
- [x] 友情链接管理
	- [x] 友情链接列表
	- [x] 添加友情链接
	- [x] 修改友情链接
- [x] 博客全局配置
- [x] 七牛资源图片管理
- [ ] 后台首页界面
- [x] 博客前端页面
- [x] 分享代码配置
- [x] 博客前端页面ID加密
- [x] 前端URL静态化

## 待完成
- [ ] SEO配置优化
- [ ] reids记录文章浏览量
- [ ] redis计算推荐文章
- [ ] 学院模块

## 项目缺陷
个人博客是赶时间写的，难免有不完善的地方，这里只说一些比较严重的缺陷：

* 网站分类和菜单分类并非“无限极”，只是采用常规的递归方法
* 所有数据ID加密问题，iDashboard 之前的代码是没有考虑ID加密，现在只有文章ID加密

## 安装
待完善...