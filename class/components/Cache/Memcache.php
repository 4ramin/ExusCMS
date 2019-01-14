<?

	if(!defined("__FLOWER__")) exit();
		
	class memcache{
		
		protected $type;
		protected $cache;
		
		protected function __construct(){
			if(module::memcached()){
				$this->cache = new Memcached;
				$this->type = "memcached";
			}
			elseif(module::memcache()){
				$this->cache = new Memcache;
				$this->type = "memcache";
			}
		}
		
		public static function init($args){
			$host = $args->host;
			$port = $args->port;
			$this->cache->addServer($host, $port);
		}
		
		public static function truncate(){
			return $this->cache->flush();
		}
		
		public static function set($args){
			$key = $args->key;
			$valid_time = $args->time;
			$buff = $args->buff;
			if($this->type=="memcached"){
				return $this->set($key, array(time(), $buff), $valid_time);
			}elseif($this->type=="memcache"){
				return $this->set($key, array(time(), $buff), MEMCACHE_COMPRESSED, $valid_time);
			}
		}
		
		public static function kill($args){
			$key = $args->key;
			return $this->cache->delete($key);
		}
		
		public static function get($args){
			$key = $args->key;
			$limit = $args->limit;
			$cache = $this->cache->get($key);
			if(!$verify || !is_array($cache)){
				return false;
			}elseif($limit > 0 && $limit > $cache[0]){
				$this->kill($key);
				return false;
			}
			
			return $cache[1];
		}
	}