<?php

class json
{

	/**
	 * json encode
	 *
	 * @param  string source
	 *
	 * @return string
	 */
	public static function encode($args)
	{
		$json = $args->source;
		return json_encode($json, JSON_PRETTY_PRINT);
	}
	
	/**
	 * json decode
	 *
	 * @param  string source
	 *
	 * @return string
	 */
	public static function decode($args)
	{
		$json = $args->source;
		return json_decode($json);
	}
	
	/**
	 * get json contents
	 *
	 * @param  stdClass args
	 *
	 * @return string
	 */
	public static function get($args)
	{
		
		$json = file::get($args);
		
		if($json)
		{
			$json = json_decode($json);
			return $json;
		}
		else
		{
			return false;
		}
	}

}

?>