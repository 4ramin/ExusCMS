<?php

class dir
{
   
	/**
	 * get directory root
	 */
	public static function dir_root()
	{
		return dirname(__FILE__);
	}
	
	public static function isEmpty($dir)
	{
		if (!is_readable($dir)) return null;
		$handle = opendir($dir);
		while(($entry = readdir($handle)) !== false)
		{
			if($entry !== '.' && $entry !== '..')
			{
				return false;
			}
		}
		
		return true;
	}

	public static function emptyFolder($dir)
	{
		$glob = glob($folder);
		foreach ($glob as $g) 
		{
			if (!is_dir($g)) 
			{
				unlink($g);
			} 
			else 
			{
				delete_folder("$g/*");
				rmdir($g);
			}
		}
	}
	
	/**
	 * get document root
	 */
	public static function root()
	{
		return $_SERVER['DOCUMENT_ROOT'];
	}
	
	/**
	 * make directory
	 *
	 * @param  string/array args->path
	 * @param       int     args->mode
	 *
	 * @return pdo
	 */
	public static function make($args)
	{
		
		//args
		$path = $args->path;
		$mode = $args->mode;
		if(!isset($mode)) $mode = 644; //permit
		
		//set variable type
		settype($mode,"integer");
		
		//make single directory
		if(!is_array($path))
		{
			if(!is_dir($path))
			{
				if(!mkdir($path, $mode, true)) 
				{
					return FALSE;
				}
			}
		}
		else
		{
		//make array directory
			foreach($path as $val)
			{
				if(!is_dir($val))
				{
					if(!mkdir($val, $mode, true)) 
					{
						return FALSE;
					}
				}
			}
		}
		return TRUE;
	}
	
	/**
	 * remove directory
	 *
	 * @param  string/array args->path
	 *
	 * @return pdo
	 */
	public static function remove($args)
	{
		
		//args
		$path = $args->path;
		
		//remove single directory
		if(!is_array($path))
		{
			if(is_dir($path))
			{
				if(!rmdir($path)) 
				{
					return FALSE;
				}
			}
		}else{
		//remove array directory
			foreach($path as $val){
				if(is_dir($val)){
					if(!rmdir($val)) 
					{
						return FALSE;
					}
				}
			}
		}
		
		return TRUE;
	}
	
	public static function get(){
		return getcwd();
	}
	
	
	/**
	 * check directory exist
	 *
	 * @param  string args->path
	 *
	 * return boolean
	 */
	public static function exist($args)
	{
		
		//args
		$path = $args->path;
		
		return is_dir($path);
	}
	
	/**
	 * scan directory
	 *
	 * @param  string args->path
	 *
	 * @return pdo
	 */
	public static function scan($args)
	{
		
		//args
		$path = $args->path;
		
		return scandir($path);
	}
	
	/**
	 * directory list
	 *
	 * @param  string  args->path
	 * @param  string  args->target [FILE|PATH|NULL]
	 * @param  boolean args->show_sub
	 * @param  boolean args->show_path
	 *
	 * @return array
	 */
	public static function _list(\stdClass $args)
	{
		
		//variables
		$arr_list = array();
		
		//args
		$path = $args->path;
		if(isset($args->target)) 
		{
			$list_target = $args->target;
		}
		
		$include_subdirectory = $args->show_sub;
		if(!isset($include_subdirectory)) 
		{
			$include_subdirectory = FALSE;
		}
		
		$include_path = $args->show_path;
		if(!isset($include_path)) 
		{
			$include_path = FALSE;
		}
		
		//get handle
		$handle = opendir($path);
		if(!$handle)
		{
			return FALSE;
		}
		
		//scan
		if($include_subdirectory == FALSE)
		{
			while(false !== ($file = readdir($handle)))
			{
				if(!isset($list_target))
				{
					if($include_path == TRUE)
					{
						array_push($arr_list,$path.'/'.$file);
					}
					else
					{
						array_push($arr_list,$file);
					}
				}
				elseif(strtoupper($list_target) == 'FILE' && is_file($path.'/'.$file))
				{
					if($include_path == TRUE)
					{
						array_push($arr_list,$path.'/'.$file);
					}
					else
					{
						array_push($arr_list,$file);
					}
				}
				elseif(strtoupper($list_target) == 'PATH' && is_dir($path.'/'.$file))
				{
					if($include_path == TRUE)
					{
						array_push($arr_list, $path.'/'.$file);
					}
					else
					{
						array_push($arr_list, $file);
					}
				}
			}
		}
		else
		{
			//scan
			$di = new RecursiveDirectoryIterator($path);
			foreach (new RecursiveIteratorIterator($di) as $filename => $file)
			{
				if($include_path == TRUE)
				{
					array_push($arr_list, $filename);
				}
				else
				{
					array_push($arr_list, $file->getFilename());
				}
			}
		}
		
		return $arr_list;
	}
}

?>