<?php

	if (!defined("__FLOWER__")) exit();

	class zip
	{
		
		public static function getZipCompressedSize($file) 
		{
			$zip = new ZipArchive();
			if ($zip->open($file) === true) 
			{
				$totalSize = 0;
				for($i = 0; $i < $zip->numFiles; $i++) 
				{
					$fileStats = $zip->statIndex($i);
					$totalSize += $fileStats['size'];
				}
				$results = filesize($file);
				$zip->close();
				return $results;
			}
		}
		
		public static function getZipRequiredSize($file) 
		{
			$zip = new ZipArchive();
			if ($zip->open($file) === true) 
			{
				$totalSize = 0;
				for ($i = 0; $i < $zip->numFiles; $i++) 
				{
					$fileStats = $zip->statIndex($i);
					$totalSize += $fileStats['size'];
				}
				
				$results = round(($totalSize - filesize($file)), -4);
				$zip->close();
				return $results;
			}
		}
		
		public static function unzip($args) 
		{
		
			$sorce = $args->from;
			$dest = $args->to;

			$zip = zip_open($sorce);
			
			while($zip_entry = zip_read($zip)) 
			{
				if (!zip_entry_open($zip, $zip_entry,"r")) 
				{
					return FALSE;
				}
				
				$zdir = dirname(zip_entry_name($zip_entry));
				if (!is_dir($zdir)) 
				{
					mkdir($zdir,0777);
				}

				$zip_fs = zip_entry_filesize($zip_entry);
				if (empty($zip_fs)) 
				{
					continue;
				}

				$zname = zip_entry_name($zip_entry);
				$z = fopen($zname, "w");
				$zz = zip_entry_read($zip_entry, $zip_fs);
				fwrite($z,$zz);
				fclose($z);
				zip_entry_close($zip_entry);

			}
			
			zip_close($zip);
		}
		
		public static function zip_file($args) 
		{
			$zip = new ZipArchive();
			$filename = $args->target;
			$filelist = $args->content;
			
			if ($zip->open($filename, ZipArchive::CREATE)!==TRUE) 
			{
				return FALSE;
			}

			foreach ($filelist as $key=>$val) 
			{
				if (file_exists($val['file'])) 
				{
					$zip->addFile($val['file'],$val['filename']);
				} 
				else 
				{
					echo $val['file'];
				}
			}
			
			$zip->close();
		}
		
	}
?>