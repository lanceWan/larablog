<?php 
namespace App\Traits;
use Redis;
trait RedisOperationTrait{
	/**
	 * 添加元素到有序集合中
	 * @author 晚黎
	 * @date   2017-03-01T14:22:14+0800
	 * @param  [type]                   $score [description]
	 * @param  [type]                   $key   [description]
	 */
	public function incrScore($score, $key)
	{
		return Redis::zincrby(config('admin.global.redis.zset'), $score, $key);
	}

	/**
	 * 获取有序集合元素，按照分值倒序排列
	 * @author 晚黎
	 * @date   2017-03-01T14:23:45+0800
	 * @param  integer                  $start [description]
	 * @param  integer                  $end   [description]
	 * @return [type]                          [description]
	 */
	public function zrevrange($start = 0, $end = -1)
	{
		return Redis::zrevrange(config('admin.global.redis.zset'), $start, $end);
	}

	/**
	 * 更新有序集合中元素的分数
	 * @author 晚黎
	 * @date   2017-03-01T14:39:59+0800
	 * @param  [type]                   $score [description]
	 * @param  [type]                   $key   [description]
	 * @return [type]                          [description]
	 */
	public function zadd($score, $key)
	{
		return Redis::zadd(config('admin.global.redis.zset'), $score, $key);
	}

	/**
	 * 删除有序集合中的元素，不存在的key则被忽略
	 * @author 晚黎
	 * @date   2017-03-01T14:44:53+0800
	 * @param  [type]                   $key [description]
	 * @return [type]                        [description]
	 */
	public function zrem($key)
	{
		return Redis::zrem(config('admin.global.redis.zset'), $key);
	}

	/**
	 * [hmset description]
	 * @author 晚黎
	 * @date   2017-03-01T15:29:28+0800
	 * @param  [type]                   $id    [description]
	 * @param  [type]                   $field [description]
	 * @return [type]                          [description]
	 */
	public function hmset($id, $field)
	{
		return Redis::hmset(config('admin.global.redis.hash').$id,$field);
	}

	/**
	 * 文章浏览量、收藏等增加
	 * @author 晚黎
	 * @date   2017-03-01T15:30:32+0800
	 * @param  string                   $value [description]
	 * @return [type]                          [description]
	 */
	public function hincr($id, $field, $score)
	{
		return Redis::hincrby(config('admin.global.redis.hash').$id, $field, $score);
	}

	/**
	 * 删除Redis键
	 * @author 晚黎
	 * @date   2017-03-01T15:56:43+0800
	 * @param  [type]                   $key [description]
	 * @return [type]                        [description]
	 */
	public function delKey($key)
	{
		return Redis::del($key);
	}

	/**
	 * 获取文章数据
	 * @author 晚黎
	 * @date   2017-03-01T16:46:20+0800
	 * @param  [type]                   $id  [description]
	 * @param  [type]                   $key [description]
	 * @return [type]                        [description]
	 */
	public function hgetVisits($id, $key)
	{
		return Redis::hget(config('admin.global.redis.hash').$id, $key);
	}
}