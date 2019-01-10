<?php

class module
{
	public static function safe_mode(){
		return ini_get('safe_mode');
	}
	
	public static function memcache(){
		return class_exists('Memcache');
	}
	
	public static function memcached(){
		return class_exists('Memcached');
	}
	
	public static function apc(){
		return function_exists('apc_add');
	}
	
	public static function mbregexenc(){
		return function_exists('mb_regex_encoding');
	}
	
	public static function mbienc(){
		return function_exists('mb_internal_encoding');
	}
	
	public static function iconvenc(){
		return function_exists('iconv_set_encoding');
	}
	
	public static function idntoascii(){
		return function_exists('idn_to_ascii');
	}
	
	public static function opcache_invalidate(){
		function_exists('opcache_invalidate');
	}
	
	public static function idn_to_utf8(){
		return function_exists('idn_to_utf8');
	}
	
	public static function php_ver(){
		return PHP_VERSION;
	}
	
}