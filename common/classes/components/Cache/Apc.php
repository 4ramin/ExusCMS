<?php

	if(!defined("__FLOWER__")) exit();
	
	class apc
	{
		
		/**
		 * apc truncate
		 */
		public static function truncate()
		{
			return apc_clear_cache('user');
		}
		
		/**
		 * set apc cache
		 *
		 * @param  string args->key
		 * @param  int    args->valid_time
		 * @param  int    args->buff
		 *
		 * @return apc_store
		 */
		public static function set($args)
		{
			$key = $args->key;
			$valid_time = $args->time;
			$buff = $args->buff;
			return apc_store($key, array($_SERVER['REQUEST_TIME'], $buff), $valid_time);
		}
		
		/**
		 * delete apc cache
		 *
		 * @param  string args->key
		 */
		public static function kill($args)
		{
			$key = $args->key;
			return $key and apc_delete($key);
		}
		
		/**
		 * get apc cache
		 *
		 * @param  string args->key
		 * @param  int    args->limit
		 *
		 * @return cache
		 */
		public static function get($args)
		{
			$key = $args->key;
			$limit = $args->limit;
			$cache = apc_fetch($key, $limit);
			if (!$verify || !is_array($cache))
			{
				return false;
			}
			elseif($limit > 0 && $limit > $cache[0])
			{
				$this->kill($key);
				return false;
			}
			
			return $cache[1];
		}
	}

?>