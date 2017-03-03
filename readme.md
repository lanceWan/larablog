<p align="center"><a href="https://laravel.com" target="_blank"><img width="150"src="https://laravel.com/laravel.png"></a></p>


## 关于Larablog
基于iDashboard后台的个人开源博客，优化[iDashboard](https://github.com/lanceWan/iDashboard)部分代码，理论上是升级版，后台主题是用的 [INSPINIA - Responsive Admin Theme](https://wrapbootstrap.com/theme/inspinia-responsive-admin-theme-WB0R5L90S) 主题，本人代码完全开源，至于主题只供学习交流。如需商业应用请自行购买授权！

**博客预览地址：[iwanli.me](http://iwanli.me)**

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
- [x] 博客前端页面
- [x] 分享代码配置
- [x] 博客前端页面ID加密
- [x] 前端URL静态化
- [x] SEO配置优化
- [x] reids记录文章浏览量
- [x] redis计算推荐文章

## 待完成
- [ ] 学院模块
- [ ] 后台首页界面

## 项目缺陷
个人博客是赶时间写的，难免有不完善的地方，这里只说一些比较严重的缺陷：

* 网站分类和菜单分类并非“无限极”，只是采用常规的递归方法
* 所有数据ID加密问题，iDashboard 之前的代码是没有考虑ID加密，现在只有文章ID加密

## 安装
下载本项目代码到本地:

```
git clone https://github.com/lanceWan/larablog.git
```

进入到项目然后 `composer` 安装:

```
cd larablog

composer install
```

配置 `.env` 文件:

```
[sudo]cp .env.example .env
```

> Linux 和 Mac 下注意执行权限 !

配置数据库和日志:

```
DB_HOST=localhost
DB_DATABASE=homestead
DB_USERNAME=homestead
DB_PASSWORD=secret

# log日志包配置，这里固定这么写(后面考虑去掉)
APP_LOG=daily
```

迁移数据:

```
php artisan migrate --seed
```

OK,项目已经配置完成，后台首页 `/admin/dash`，不清楚路由的可以直接去看 `routes/web.php` 文件。默认管理员账号：`iwanli` , 密码：`123456` 。如果你是在Linux或Mac下配置的请注意相关目录的权限，这里我就不多说了，enjoy！


# 错误邮件发送
发送错误邮件请先配置好邮件发送服务器，具体看官方文档或者中文文档。

```php
# 邮件地址
MAIL_ADRESS=null
# 发件人名称
MAIL_NAME=null
# 错误邮件发送地址
MAIL_SYSTEMERROR=null
```

最后一个错误邮件发送地址是系统报错后接收的邮箱地址，默认为空（空值的情况下是不会进行发送邮件）。队列默认情况下是本地实时发送，换其他的发送驱动请参考文档上设置即可。

> 如有什么错误的地方，请指点，非常感谢！也可以直接加QQ群: 312621686 。现阶段比较忙，没有太多时间给各位一一解答，希望理解！