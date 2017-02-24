<?php
namespace App\Service\Admin;
use App\Traits\SendSystemErrorTrait;
use Exception,Settings;
use App\Traits\QiniuTrait;
/**
* 博客设置service
*/
class SettingService
{
	use SendSystemErrorTrait,QiniuTrait;

	public function index()
	{
		return Settings::has(config('admin.global.blog')) ? settings(config('admin.global.blog')) : config('admin.global.setting');
	}

	public function storeSetting($request)
	{
		try {
			$attributes = $request->except('_token');
			$settings = settings(config('admin.global.blog'),[]);
			// 支付宝赞助
			if ($request->hasFile('sponsor_alipay')) {
				$attributes['sponsor_alipay'] = $this->upload($request->file('sponsor_alipay'));
			}else{
				$attributes['sponsor_alipay']= isset($settings['sponsor_alipay']) ? $settings['sponsor_alipay']:'';
			}
			// 微信赞助
			if ($request->hasFile('sponsor_wechat')) {
				$attributes['sponsor_wechat'] = $this->upload($request->file('sponsor_wechat'));
			}else{
				$attributes['sponsor_wechat'] = isset($settings['sponsor_wechat']) ? $settings['sponsor_wechat']:'';
			}
			settings([config('admin.global.blog') => $attributes]);
			// 清楚缓存
			if (cache()->has(config('admin.global.blog'))) {
				cache()->forget(config('admin.global.blog'));
			}
			flash(trans('admin/alert.setting.update_success'),'success')->important();
		} catch (Exception $e) {
			// 错误信息发送邮件
			$this->sendSystemErrorMail(env('MAIL_SYSTEMERROR',''),$e);
			return false;
		}
		
	}
}