<?php

class session{
	
	public static function on() {
		if (session_status() == PHP_SESSION_NONE && empty($_SESSION)) {
			/*$sn = session_name('flowersession');
			if (isset($_COOKIE[$sn])) {
				$sessid = $_COOKIE[$sn];
			}else {
				session_name('flowersession');
				return session_start();
			}
			
			if (!preg_match('/^[a-zA-Z0-9,\-]{22,40}$/', $sessid)) {
				return false;
			}*/
			
			session_name('flowersession');
			session_start();
		}
	}
	
	public static function getSessionInstance() {
		return $_SESSION;
	}
	
	public static function getToken() {
		return md5(uniqid(rand(), TRUE));
	}
	
	public static function isExistToken() {
		if (!isset($_SESSION['token'])) {
			return false;
		} else {
			return true;
		}
	}
	
	public static function get($args) {
		$name = $args->name;
		
		return $_SESSION[$name];
	}
	
	public static function set($args) {
		$name = $args->name;
		$value = $args->val;
		
		$_SESSION[$name] = $value;
	}
	
	public static function _unset($args) {
		$name = $args->name;
		
		if (!is_array($name)) {
			unset($_SESSION[$name]);
		}
	}
	
}