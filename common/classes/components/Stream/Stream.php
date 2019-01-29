<?php

class stream
{
	
	public static function mp3_to_ogg($args)
	{
		$res = @system("/usr/bin/mp32ogg $file $path");
	}
	
	/*
	 * return I/O stream
	 */
	public static function getinput()
	{
		 return @file_get_contents('php://input');
	}
	
	/*
	 * return standard input
	 */
	public static function input()
	{
		return @fopen('php://stdin', 'r');
	}
	
	/*
	 * return standard output
	 */
	public static function output()
	{
		return @fopen('php://stdout', 'w');
	}
	
	/*
	 * return standard error
	 */
	public static function error()
	{
		return @fopen('php://stderr', 'w');
	}
	
	
	/*
	 * @param array $args
	 *
	 * return audio stream
	 */
	public static function range_audio($args)
	{
		
		//args
		$mp3   = $args->from;
		$name  = $args->name;
		$cache = $args->cache;
		$range = $args->range;
		$start = $args->start;
		
		if(!$range)
		{
			$range = 0;
		}
		
		if(!$start)
		{
			$start = 0;
		}
		
		header('Content-Description: File Transfer');
		header('Accept-Ranges: bytes');
		header("Content-Transfer-Encoding: chunked");
		header('X-Pad: avoid browser bug');
		header('Cache-Control: max-age=604800');
		
		//none cache
		if($cache==FALSE)
		{
			header::no_cache();
		}
		
		$fsize = filesize($mp3);
		
		//length
		if(file_exists($mp3))
		{
			header('Content-length: ' . $range);
		}
		
		if($name)
		{
			header('Content-Disposition: attachment; filename="' . $name); //inline
		}
		
		//header::binary_enc();
		header("Content-Type: audio/mpeg, audio/x-mpeg, audio/x-mpeg-3, audio/mpeg3");
		
		$handle = fopen($mp3, "r");
		fseek($handle, $start);
		$contents = fread($handle, $range);
		fclose($handle);
		
		echo $contents;
		//readfile($mp3);
	}
	
	
	/*
	 * @param array $args
	 *
	 * return audio stream
	 */
	public static function audio($args)
	{
		
		//args
		$mp3   = $args->from;
		$name  = $args->name;
		$cache = $args->cache;
		
		header('Content-Description: File Transfer');
		header('Accept-Ranges: bytes');
		header("Content-Transfer-Encoding: chunked");
		header('X-Pad: avoid browser bug');
		header('Cache-Control: max-age=604800');
		
		//none cache
		if($cache==FALSE)
		{
			header::no_cache();
		}
		
		//length
		if(file_exists($mp3))
		{
			header('Content-length: ' . filesize($mp3));
		}
		
		if($name)
		{
			header('Content-Disposition: attachment; filename="' . $name); //inline
		}
		
		//header::binary_enc();
		header("Content-Type: audio/mpeg, audio/x-mpeg, audio/x-mpeg-3, audio/mpeg3");
		readfile($mp3);
	}
	
}

?>