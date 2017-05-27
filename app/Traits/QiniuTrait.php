<?php
namespace App\Traits;
use zgldh\QiniuStorage\QiniuStorage;
trait QiniuTrait{

	/**
	 * 上传文件到七牛
	 * @author 晚黎
	 * @date   2016-12-12T17:14:41+0800
	 * @param  [type]                   $file [request file 对象]
	 * @return [type]                         [图片路径]
	 */
	public function upload($file)
	{
		$disk = QiniuStorage::disk('qiniu');
		$fileName = md5($file->getClientOriginalName().time().rand()).'.'.$file->getClientOriginalExtension();
		$isUpload = $disk->put(config('admin.global.imagePath').$fileName,file_get_contents($file->getRealPath()));
		if ($isUpload) {
			$customUrl  = env('QINIU_DOMAINS_CUSTOM') ? 'http://'.env('QINIU_DOMAINS_CUSTOM') : 'http://'.env('QINIU_DOMAINS_DEFAULT');
			$path = $customUrl.'/'.config('admin.global.imagePath').$fileName;
			return $path;
		}
		return '';
	}
	/**
	 * 获取目录下所有图片
	 * @author 晚黎
	 * @date   2016-12-16T12:25:35+0800
	 * @param  [type]                   $directory [description]
	 * @return [type]                              [description]
	 */
	public function allFiles($directory)
	{
		$disk = QiniuStorage::disk('qiniu');
		return $disk->files($directory);
	}
	/**
	 * 删除七牛图片
	 * @author 晚黎
	 * @date   2016-12-19T11:24:13+0800
	 * @param  [type]                   $img [description]
	 * @return [type]                        [description]
	 */
	public function deleteFile($img)
	{
		$disk = QiniuStorage::disk('qiniu');
		return $disk->delete($img);
	}
}