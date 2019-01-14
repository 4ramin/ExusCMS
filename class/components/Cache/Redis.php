<?php

	if(!defined("__FLOWER__")) exit();
	
	class rediscache{
		
		public static function init($args){
			$host = $args->host;
			$port = $args->port;
			if(!$port){
				$port = 6379;
			}
			$this->cache = new Redis();
			$this->cache->connect($host, $port);
			if($this->cache === FALSE){
				preg_match('/redis_version:(.*?)\n/', static::$redis->info(), $info);
				if (version_compare(trim($info[1]), '1.2') < 0){
					return;
				}
			}
		}

		/**
		 * push redis list
		 *
		 * @param  string args->key
		 * @param  string args->val
		 */
		public static function _list($args){
			$key = $args->key;
			$val = $args->val;
			$this->cache->lpush($key, $val);
		}
		
		/**
		 * delete redis cache
		 *
		 * @param  string args->key
		 * @param  string args->val
		 */
		public static function kill($args){
			$key = $args->key;
			$val = $args->val;
			$this->cache->del($key, $val);
			//$redis->expireat($key, time() + 3600);
		}
		
		/**
		 * set redis cache
		 *
		 * @param  string args->key
		 * @param  string args->val
		 */
		public static function set($args){
			$key = $args->key;
			$val = $args->val;
			$this->cache->set($key, $val);
		}
		
		/**
		 * get redis cache
		 *
		 * @param  string args->key
		 * @param  int    args->limit
		 *
		 * @return cache
		 */
		public static function get($args){
			$key = $args->key;
			
			if($this->cache->exists($key)){
				return $this->cache->get($key);
			}
			//$redis->lrange("tutorial-list", 0 ,5);
		}
	}

	?>