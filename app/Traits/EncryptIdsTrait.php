<?php
namespace App\Traits;
use Hashids;
trait EncryptIdsTrait{

	private $encryptConnection;

	/**
	 * 设置加密
	 * @author 晚黎
	 * @date   2016-12-13T14:46:13+0800
	 * @param  string                   $value [description]
	 */
	public function setEncryptConnection($connection='main')
	{
		$this->encryptConnection = $connection;
	}
	/**
	 * 加密ID
	 * @author 晚黎
	 * @date   2016-12-13T14:47:12+0800
	 * @param  [type]                   $id         [description]
	 * @param  string                   $connection [description]
	 * @return [type]                               [description]
	 */
	public function encodeId($id,$connection = 'main'){

		if (!config('hashids.connections.'.$connection)) {
			$connection = 'main';
		}
		if(config('admin.global.encrypt.'.$this->encryptConnection)){
			return Hashids::connection($connection)->encode($id);
		}else{
			return $id;
		}
	}
	/**
	 * 解密ID
	 * @author 晚黎
	 * @date   2016-12-13T14:47:22+0800
	 * @param  [type]                   $id         [description]
	 * @param  string                   $connection [description]
	 * @return [type]                               [description]
	 */
	public function decodeId($id,$connection = 'main')
	{
		if (!config('hashids.connections.'.$connection)) {
			$connection = 'main';
		}
		if(config('admin.global.encrypt.'.$this->encryptConnection)){
			$id = Hashids::connection($connection)->decode($id);
			return $id[0];
		}else{
			return $id;
		}
	}

	/**
	 * 转换ID
	 * @author 晚黎
	 * @date   2016-12-15T10:36:26+0800
	 * @param  string                   $value [description]
	 */
	public function getEncryptId($collection)
	{
		if (!$collection->isEmpty()) {
            $collection = $collection->each(function ($item,$index)
            {
                $item->encodeId = $this->encodeId($item->id);
                return $item;
            });
            return $collection;
        }
        return [];
	}
}
