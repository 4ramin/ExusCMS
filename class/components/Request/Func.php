<?php

class Fct
{
	
	public static function mk_func($args) {
		$func_args = $args->args;
		$func_code = $args->code;
		
		create_function($func_args, $func_code);
	}
	
	public static function get_args_cnt($args) {
		return func_num_args();
	}
	
	public static function get_arg($args) {
		$position = $args->pos;
		
		if (isset($position)) {
			return func_get_arg($position);
		} else {
			return func_get_args();
		}
	}
	
}
?>