<?php

/**
 * File Classes
 */

class file
{
	
	/**
	 * get ini file
	 *
	 * @param  string target
	 *
	 * @return string
	 */
	public static function parse_ini(\stdClass $args)
	{
		$target = $args->target;
		
		if (file_exists($target)) return FALSE;
		
		return parse_ini_file($target);
	}
	
	public static function getOutputBuffer(\stdClass $args)
	{
		$target = $args->target;
		$required = $args->required;
		if (!$required) $required = false;
		
		ob_start();
			
		if (isset($target))
		{
			if (file_exists($target))
			{
				@include($target);
			}
			else
			{
				if ($required) die("invalid skin");
			}
		}
		
		$include = ob_get_clean();
		
		return $include;
	}
	
	public static function mime($file)
	{
		$file_map = [
			'au'=>'audio/basic',
			'avi'=>'video/avi',
			'bmp'=>'image/bmp',
			'bz2'=>'application/x-bzip2',
			'css'=>'text/css',
			'dtd'=>'application/xml-dtd',
			'doc'=>'application/msword',
			'gif'=>'image/gif',
			'gz'=>'application/x-gzip',
			'hqx'=>'application/mac-binhex40',
			'html?'=>'text/html',
			'jar'=>'application/java-archive',
			'jpe?g'=>'image/jpeg',
			'js'=>'application/x-javascript',
			'midi'=>'audio/x-midi',
			'mp3'=>'audio/mpeg',
			'mpe?g'=>'video/mpeg',
			'ogg'=>'audio/vorbis',
			'pdf'=>'application/pdf',
			'png'=>'image/png',
			'ppt'=>'application/vnd.ms-powerpoint',
			'ps'=>'application/postscript',
			'qt'=>'video/quicktime',
			'ram?'=>'audio/x-pn-realaudio',
			'rdf'=>'application/rdf',
			'rtf'=>'application/rtf',
			'sgml?'=>'text/sgml',
			'sit'=>'application/x-stuffit',
			'svg'=>'image/svg+xml',
			'swf'=>'application/x-shockwave-flash',
			'tgz'=>'application/x-tar',
			'tiff'=>'image/tiff',
			'txt'=>'text/plain',
			'wav'=>'audio/wav',
			'xls'=>'application/vnd.ms-excel',
			'xml'=>'application/xml',
			'zip'=>'application/x-zip-compressed',
			'mpg'=>'video/mpeg',
			'xml'=>'text/xml',
			'js'=>'text/javascript'
		];
			
		if (preg_match('/\w+$/',$file,$ext))
		{
			foreach ($file_map as $key=>$val)
			{
				if (preg_match('/'.$key.'/',strtolower($ext[0])))
				{
					return $val;
				}
			}
		}
		
		return 'application/octet-stream';
	}
	
	/**
	 * make cache
	 *
	 * @param  string args->from
	 * @param  string args->to
	 *
	 * @return string
	 */
	public static function make_cache(\stdClass $args)
	{
		$from = $args->from;
		$to = $args->to;
		
		if (file_exists($to)) return FALSE;
		
		if (file_exists($from))
		{
			$cached = fopen($from, 'w');
			fwrite($to, ob_get_contents());
			fclose($to);
			ob_end_flush();
		}
		else
		{
			return FALSE;
		}
	}
	
	/**
	 * get flie contents
	 *
	 * @param  string args->from
	 *
	 * @return string
	 */
	public static function get(\stdClass $args)
	{
		clearstatcache();
		
		$fname = $args->from;
		
		if (file_exists($fname) && is_file($fname) && is_readable($fname))
		{
			$proc_file = fopen($fname, 'r');
			$output = fread($proc_file, filesize($fname));
			fclose($proc_file);
			return $output;
		}
		else
		{
			return FALSE;
		}
	}
	
	/**
	 * get filesize format
	 *
	 * @param  int args->from
	 *
	 * @return bytes
	 */
	public static function filesize_format($file)
	{
		clearstatcache();
		
		if (file_exists($file))
		{
			$bytes = filesize($file);
		}
		else
		{
			$bytes = $file;
		}
		
		if ($bytes > 0)
		{
			if ($bytes >= 1208925819614629174706176)
			{
				$bytes = number_format($bytes / 1208925819614629174706176, 2).'YB';
			}
			elseif ($bytes >= 1180591620717411303424)
			{
				$bytes = number_format($bytes / 1180591620717411303424, 2).'ZB';
			}
			elseif ($bytes >= 1152921504606846976)
			{
				$bytes = number_format($bytes / 1152921504606846976, 2).'EB';
			}
			elseif ($bytes >= 1125899906842624)
			{
				$bytes = number_format($bytes / 1125899906842624, 2).'PB';
			}
			elseif ($bytes >= 1099511627776)
			{
				$bytes = number_format($bytes / 1099511627776, 2).'TB';
			}
			elseif ($bytes >= 1073741824)
			{
				$bytes = number_format($bytes / 1073741824, 2).'GB';
			}
			elseif ($bytes >= 1048576)
			{
				$bytes = number_format($bytes / 1048576, 2).'MB';
			}
			elseif ($bytes >= 1024)
			{
				$bytes = number_format($bytes / 1024, 2).'KB';
			}
			elseif ($bytes > 1)
			{
				$bytes = $bytes.' BYTES';
			}
			elseif ($bytes == 1)
			{
				$bytes = $bytes.' BYTE';
			}
			else
			{
				$bytes = '0 BYTES';
			}
			
			return $bytes;
		}
		else
		{
			return FALSE;
		}
	}

	/**
	 * remove file
	 *
	 * @param  string/array args->path
	 *
	 * @return pdo
	 */
	public static function remove(\stdClass $args)
	{
		
		//args
		$path = $args->from;
		
		//remove single file
		if (!is_array($path))
		{
			if (file_exists($path))
			{
				if (!unlink($path)) return FALSE;
			}
		}
		else
		{
		//remove array file
			foreach($path as $val)
			{
				if (file_exists($val))
				{
					if (!unlink($val)) return FALSE;
				}
			}
		}
		
		return TRUE;
	}
	
	/**
	 * copy file
	 *
	 * @param  string/array args->from
	 * @param  string/array args->to
	 *
	 * @return pdo
	 */
	public static function copy(\stdClass $args)
	{
		
		//variables
		$arr_dest = array();
		$input = NULL;
		$index = NULL;
		
		//args
		$source = $args->from;
		$dest = $args->to;
		
		//copy single file
		if (!is_array($source) && !is_array($dest))
		{
			if (file_exists($source) && !file_exists($dest))
			{
				if (!copy($source, $dest)) return FALSE;
			}
			
		//copy multi file
		}elseif (is_array($source) && is_array($dest))
		{
			foreach($source as $index=>$input)
			{
				$arr_dest = $dest[$index];
				if (file_exists($input) && !file_exists($arr_dest))
				{
					if (!copy($input, $arr_dest))
					{
						return FALSE;
					}
				}
			}
		}
	}
	
	/**
	 * move(rename) file
	 *
	 * @param  string/array args->from
	 * @param  string/array args->to
	 *
	 * @return pdo
	 */
	public static function move(\stdClass $args)
	{
		
		//variabless
		$arr_dest = array();
		
		//args
		$source = $args->from;
		$dest = $args->to;
		
		//single
		if (!is_array($source) && !is_array($dest))
		{
			rename($source, $dest);
			
		//array
		}elseif (is_array($source) && is_array($dest))
		{
			
			//check array
			if (count($source)!=count($dest)) return FALSE;
			
			foreach($source as $index=>$val)
			{
				$arr_dest = $dest[$index];
				rename($val, $arr_dest);
			}
		}
	}
	
	/**
	 * put file
	 *
	 * @param  string/array args->target
	 * @param  string/array args->content
	 *
	 * @return pdo
	 */
	public static function put(\stdClass $args)
	{
		clearstatcache();
		
		//variables
		$proc_file = NULL;
		$input = NULL;
		$target = NULL;
		$index = NULL;
		$arr_fname = array();
		
		//args
		$fname = $args->from;
		$content = $args->content;
		$seek = $args->seek;
		$is_append = $args->append;
		$sort_input = $args->sort;
		if (!isset($sort_input)) $sort_input = TRUE;
		
		//set variable type
		settype($seek,"integer");
		settype($is_append,"boolean");
		settype($sort_input,"boolean");
	
		//not array | not array
		if (!is_array($fname) && !is_array($content))
		{
			
			//write single content
			if (!is_array($content))
			{
				
				//append
				if ($is_append==TRUE)
				{
					$proc_file = fopen($fname, 'a');
				}
				elseif ($is_append==FALSE)
				{
					$proc_file = fopen($fname, 'w');
				}
				
				//seek
				if (isset($seek)) {
					fseek($proc_file,$seek,SEEK_SET);
				}
				
				fwrite($proc_file, $content);
				fclose($proc_file);
			
			//write array content
			}
			elseif (is_array($content))
			{
				foreach($content as $input)
				{
					
					//append
					if ($is_append==TRUE)
					{
						$proc_file = fopen($fname, 'a');
					}
					elseif ($is_append==FALSE)
					{
						$proc_file = fopen($fname, 'w');
					}
				
					//seek
					if (isset($seek))
					{
						fseek($proc_file,$seek,SEEK_SET);
					}
				
					fwrite($proc_file, $input);
					fclose($proc_file);
				}
			}
			
		//array | array
		}
		elseif (is_array($fname) && is_array($content))
		{
			if (isset($sort_input))
			{
				
				//sort
				if ($sort_input == TRUE) {
					foreach($content as $index=>$input)
					{
						
						$arr_fname = $fname[$index];
						
						//append
						if ($is_append==TRUE)
						{
							$proc_file = fopen($arr_fname, 'a');
						}
						elseif ($is_append==FALSE)
						{
							$proc_file = fopen($arr_fname, 'w');
						}
						
						//seek
						if (isset($seek))
						{
							fseek($proc_file,$seek,SEEK_SET);
						}
				
						fwrite($proc_file, $input);
						fclose($proc_file);
					}
					
				//no sort
				}
				elseif ($sort_input == FALSE)
				{
					foreach($fname as $index=>$target)
					{
						
						//append
						if ($is_append==TRUE)
						{
							$proc_file = fopen($target, 'a');
						}
						elseif ($is_append==FALSE)
						{
							$proc_file = fopen($target, 'w');
						}
						
						//array input
						foreach($content as $index2=>$input)
						{
							
							//seek
							if (isset($seek))
							{
								fseek($proc_file,$seek,SEEK_SET);
							}
							
							fwrite($proc_file, $input);
						}
						
						fclose($proc_file);
					}
				}
			}
			
		//not array | array
		}elseif (!is_array($fname) && is_array($content))
		{
			foreach($content as $index=>$input)
			{
				
				//append
				if ($is_append==TRUE)
				{
					$proc_file = fopen($fname, 'a');
				}
				elseif ($is_append==FALSE)
				{
					$proc_file = fopen($fname, 'w');
				}
				
				//seek
				if (isset($seek))
				{
					fseek($proc_file,$seek,SEEK_SET);
				}
				
				fwrite($proc_file, $input);
				fclose($proc_file);
			}
		}
	}
	
	/**
	 * last modified time
	 *
	 * @param  string args->from
	 *
	 * @return string
	 */
	public static function last(\stdClass $args)
	{
		
		//args
		$name = $args->from;
		
		return fileatime($filename);
	}
	
	/**
	 * filesize
	 *
	 * @param  string args->from
	 *
	 * @return string
	 */
	public static function upload(\stdClass $args)
	{
		
		//args
		$source = $args->from;
		$dest = $args->to;
		$sort_input = $args->sort;
		if (!isset($sort_input)) $sort_input = TRUE;
		
		//single
		if (!is_array($source) && !is_array($dest))
		{
			return move_uploaded_file($source["tmp_name"], $dest);
		
		//array
		}
		elseif (is_array($source) && is_array($dest))
		{
			
			//check array
			if (count($souce)!=count($dest)) return FALSE;
			
			foreach($source as $index=>$input)
			{
				
				//sort
				if ($sort_input == TRUE)
				{
					$arr_dest = $dest[$index];
					move_uploaded_file($input["tmp_name"][$index], $arr_dest);
					
				//no sort
				}
				elseif ($sort_input == FALSE)
				{
					foreach($dest as $index2=>$input2)
					{
						move_uploaded_file($input["tmp_name"][$index], $input2);
					}
				}
				
			}
			
		}
	}
	
	/**
	 * filesize
	 *
	 * @param  string args->from
	 *
	 * @return string
	 */
	public static function size(\stdClass $args)
	{
		clearstatcache();
		
		//args
		$name = $args->from;
		
		if (file_exists($name))
		{
			return filesize($name);
		}
		else
		{
			return FALSE;
		}
	}
	
	/**
	 * filetype
	 *
	 * @param  string args->from
	 *
	 * @return string
	 */
	public static function type(\stdClass $args)
	{
		
		//args
		$name = $args->from;
		
		return filetype($name);
	}
	
	/**
	 * is_file
	 *
	 * @param  string args->from
	 *
	 * @return string
	 */
	public static function check(\stdClass $args)
	{
		
		//args
		$name = $args->from;
		
		return is_file($name);
	}
	
	/**
	 * filename change
	 *
	 * @param  string args->from
	 */
	public static function rename(\stdClass $args)
	{
		
		//args
		$target = $args->from;
		$dest = $args->to;
		
		return rename($target, $dest);
	}
	
	/**
	 * file_exist
	 *
	 * @param  string args->from
	 *
	 * @return string
	 */
	public static function exist(\stdClass $args)
	{
		
		//args
		$name = $args->from;
		
		return file_exists($name);
	}
	
	/**
	 * get basename
	 *
	 * @param  string args->path
	 *
	 * @return string
	 */
	public static function root(\stdClass $args)
	{
		
		//variables
		$$arr_path = array();
		
		//args
		$source = $args->source;
		
		//single
		if (!is_array($source))
		{
			return basename($source);
		
		//array
		}
		elseif (is_array($source))
		{
			$arr_path = NULL;
			foreach($source as $index=>$value) $arr_path .= $value;
			return $arr_path;
		}
	}
	
	public static function get_extension(\stdClass $args)
	{
		$extention = pathinfo($file,PATHINFO_EXTENSION);
	}
	
	/**
	 * download file
	 *
	 * @param  string args->path
	 *
	 * @return string
	 */
	public static function download(\stdClass $args)
	{
		//clearstatcache();
		
		if (isset($args->source)) 
		{
			$source = $args->source;
		}
		
		if (isset($args->speed)) 
		{
			$speed = $args->speed;
		}
		
		if (isset($args->name)) 
		{
			$name = $args->name;
		}
		
		if (isset($args->direct_download)) 
		{
			$direct_download = $args->direct_download;
		}
		else
		{
			$direct_download = "N";
		}
		
		if (!@is_file($source))
		{
			return;
		}
		
		if (!isset($speed))
		{
			$speed = 1024 * 8;
		}
		
		if (!isset($name))
		{
			$args = va::args();
			$args->source = basename($source);
			header::file_attach($args);
		}
		else
		{
			$args = va::args();
			$args->source = $name;
			header::file_attach($args);
		}
		
		header::binary_enc();
		header("Content-Length: " .(string)(filesize($source)));
		header('Accept-Ranges: bytes');
		header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
		header('Content-Type: application/octet-stream');
		header('Expires: 0');
		header('Pragma: no-cache');
		header("Content-Transfer-Encoding: binary\n");
		
		$file = @fopen($source, 'rb');
		if ($file) 
		{
			if ($direct_download=='Y') 
			{
				while(!feof($file)) 
				{
					//usleep(1);
					echo fread($file, $speed);
					flush();
				}
			}
			else
			{
				while(!feof($file)) 
				{
					print(@fread($file, 1024*8));
					ob_flush();
					flush();
				}
			}
			
			fclose($file);
			return TRUE;
		}
		else
		{
			$args = va::args();
			$args->data = $source;
			$args->code = "100";
			$args->status = "404";
			request::debug_console($args);
		}
		
	}

}

?>