<?php

class apache
{
	
	public static function modules(){
		return apache_get_modules();
	}
	
	public static function version(){
		return apache_get_version();
	}
	
	public static function header(){
		return getallheaders();
	}
	
	public static function response(){
		return apache_response_headers();
	}
	
}