<?php

class zlib
{
	
	/**
	 * unzip
	 *
	 * @param  string args->from
	 * @param  string args->to
	 *
	 */
	public static function unzip($args)
	{
		$source = $args->from;
		$dest   = $args->to;
		
		if(is_file($source) && file_exists($source) && filesize($source) > 0)
		{
			$fp = fopen($source,'rb');  
			if($fp)
			{
				$uncompresscontents = fread($fp,filesize($source));  
				fclose($fp);  

				$uncompressing = gzuncompress($uncompresscontents);  

				if($uncompressing)
				{
					$fp = fopen($dest, 'wb');  
					fwrite($fp, $uncompressing);  
					fclose($fp);
				}
			}
			else
			{
				return FALSE;
			}
		}
	}
	
	/**
	 * zip
	 *
	 * @param  string args->from
	 * @param  string args->to
	 *
	 */
	public static function zip($args)
	{
		
		$sorce = $args->from;
		$dest  = $args->to;

		$fp=fopen($sorce,'rb');  
		$compresscontents = fread($fp,filesize($sorce));  
		fclose($fp);  

		$compressing = gzcompress($compresscontents);  

		$fp = fopen($dest, 'wb');  
		fwrite($fp, $compressing);  
		fclose($fp);
		
	}
	
}

?>