<?php

class header
{
	
	public static function move($args){
		$location = $args->location;
		header("Location: ".$location);
		//script is not execute
		exit();
	}
	
	public static function xss_block(){
		header("X-XSS-Protection: 1; mode=block");
	}
	
	public static function cross_block(){
		header("X-Frame-Options: SAMEORIGIN");
	}
	
	public static function no_sniff(){
		header("X-Content-Type-Options: nosniff");
	}
	
	public static function file_attach($args){
		$src = $args->source;
		header("Content-Disposition: attachment; filename=$src");
	}
	
	public static function file_zip(){
		header("Content-Type: application/zip; charset=UTF-8");
	}
	
	public static function file_xml(){
		header("Content-Type: text/xml; charset=UTF-8");
	}
	
	public static function file_html(){
		header("Content-Type: text/html; charset=UTF-8");
	}
	
	public static function file_js(){
		header("Content-Type: text/javascript; charset=UTF-8");
	}
	
	public static function _400(){
		header("HTTP/1.0 400 Bad Request");
	}
	
	public static function _404(){
		header("HTTP/1.0 404 Not Found");
	}
	
	public static function _503(){
		header('HTTP/1.1 503 Service Unavailable');
	}
	
	public static function binary_enc(){
		header("Content-Transfer-Encoding: binary"); 
	}
	
	public static function no_cache(){
		header('Cache-Control: no-cache');
	}
	
	public static function file_json(){
		header('Content-Type: application/json');
	}
	
	public static function file_pdf(){
		header('Content-Type: application/pdf');
	}
	
	public static function file_gif(){
		header('Content-Type: image/gif');
	}
	
	public static function file_jpeg(){
		header( "Content-type: image/jpeg");
	}
	
	public static function file_jpg(){
		header("Content-type: image/jpg");
	}
	
	public static function file_png(){
		header("Content-type: image/png");
	}
	
}