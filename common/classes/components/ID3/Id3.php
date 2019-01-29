<?php

class id3
{
	
	public static function remove($args)
	{
		
		//args
		$name = $args->name;
		
		$version = id3_get_version($name);
		
		if($version & ID3_V1_0){
			id3_remove_tag($name, ID3_V1_0);
		}elseif($version & ID3_V1_1){
			id3_remove_tag($name, ID3_V1_1);
		}elseif($version & ID3_V2){
			id3_remove_tag($name, ID3_V2);
		}
		
	}
	
	public static function set($args)
	{
		
		//only 1.0, 1.1
		
		//args
		$name = $args->name;
		$tag = $args->tag;
		
		if($version & ID3_V1_0)
		{
			id3_set_tag($name, $tag, ID3_V1_0);
		}
		elseif($version & ID3_V1_1)
		{
			id3_set_tag($name, $tag, ID3_V1_1);
		}
		else{
			return FALSE;
		}
		
	}
	
	public static function version()
	{
		
		//args
		$name = $args->name;
		
		$version = id3_get_version($name);
		if ($version & ID3_V1_0) 
		{
			return 1;
		}
		elseif ($version & ID3_V1_1) 
		{
			return 1.1;
		}
		elseif ($version & ID3_V2) 
		{
			return 2;
		}
	}
	
	public static function genre_list()
	{
		return id3_get_genre_list();
	}
	
}

?>