<?php

	if (!defined("__FLOWER__")) exit();

	class zlibunpack_view extends zlibunpack 
	{
			
		function __construct() 
		{
			$this->base = new base();
			$this->pdo = $this->base->getPDO();
		}
		
		function init($args) {
			//return $this->zlibunpack;
		}
		
		function image() 
		{
			$args = va::args();
			$args->path = __DIR.'/file/image';
			$args->show_sub = TRUE;
			$args->show_path = TRUE;
			$tmp_convert = dir::_list($args);
			foreach($tmp_convert as $key=>$val) 
			{
				if (file_exists($val)) 
				{
					$args = va::args();
					$args->from = $val;
					$file = file::get($args);
					
					$file = substr($file,12); //6,12
					
					file_put_contents(__DIR.'/file/image/up/'.basename($val), $file,TRUE);
				}
			}
		}

		function uInt32($i, $endianness=false) 
		{
            $f = is_int($i) ? "pack" : "unpack";
			
			// big-endian
            if ($endianness === true) 
			{
                $i = $f("N", $i);
            } 
			// little-endian
			else if ($endianness === false) 
			{
                $i = $f("V", $i);
            } 
			// machine byte order
			else if ($endianness === null) 
			{
                $i = $f("L", $i);
            }

            return is_array($i) ? $i[1] : $i;
        }		

		function extractUWD() 
		{
			$i = 0;
			$args = va::args();
			$args->from = __DIR.'/file/rc';
			$file = file::get($args);
			
			$this->position = 0;
			$header = "UnityWebData1.0\0";
			$k = substr($file, $this->position, strlen($header));
			
			if ($k == $header) 
			{
				$this->position += strlen($header);

				//headLenth
				$args = va::args();
				$args->file = $file;
				$args->position = $this->position;
				$args->int = 32;
				$headLenth = file::getUint($args);

				$this->position += 4;

				while ($this->position < $headLenth) 
				{
					//dataOffset
					$args = va::args();
					$args->file = $file;
					$args->position = $this->position;
					$args->int = 32;
					$dataOffset = file::getUint($args);

					$this->position += 4;

					//dataLength
					$args = va::args();
					$args->file = $file;
					$args->position = $this->position;
					$args->int = 32;
					$dataLength = file::getUint($args);

					$this->position += 4;

					//nameLenth
					$args = va::args();
					$args->file = $file;
					$args->position = $this->position;
					$args->int = 32;
					$nameLenth = file::getUint($args);

					$this->position += 4;

					//Path
					$path = substr($file, $this->position, $this->position + $nameLenth);

					$this->position += $nameLenth;

					$data = substr($file, $dataOffset, $dataOffset + $dataLength);
					file_put_contents(__DIR.'/file/data/'.$i++.'.ogg', $data,TRUE);


	//break;
				}
			}
		}
		
		function uniord($c) 
		{
			$h = ord($c{0});
			
			if ($h <= 0x7F) 
			{
				return $h;
			} 
			else if ($h < 0xC2) 
			{
				return false;
			} 
			else if ($h <= 0xDF) 
			{
				return ($h & 0x1F) << 6 | (ord($c{1}) & 0x3F);
			} 
			else if ($h <= 0xEF) 
			{
				return ($h & 0x0F) << 12 | (ord($c{1}) & 0x3F) << 6
										 | (ord($c{2}) & 0x3F);
			} 
			else if ($h <= 0xF4) 
			{
				return ($h & 0x0F) << 18 | (ord($c{1}) & 0x3F) << 12
										 | (ord($c{2}) & 0x3F) << 6
										 | (ord($c{3}) & 0x3F);
			}
			else 
			{
				return false;
			}
		}
		
		function _split() 
		{
			$args = va::args();
			$args->from = __DIR.'/file/'.'rc';
			$file = file::get($args);
			$gi = 0;
			
			$filez = explode("ftypmp42",$file);
			
			foreach($filez as $val) 
			{
				/*$z = strlen($val);
				$q = $q + $z;
				$k = substr($file,$q,$z);*/
				
					
				$q = strpos($file, "ftypmp42", $gi + 30);
				$i++;
				
				if ($gi === 0) 
				{
					$k = substr($file,$gi,$q - $gi);
				} 
				else 
				{
					$k = substr($file,$gi - 4, $q - $gi + 4);
				}
				
				$gi = $q;
				
				file_put_contents(__DIR.'/file/'.$i.'.ogg', $k,TRUE);
			}
		}
		
		function execute() 
		{
			echo '<style>.msg{margin:13px 10%;padding:5px 7px;border:1px solid #a44a4a;background-color:#f8f1f1;text-align:center;border-radius:5px;color:#a80707;font-weight:bold}</style>';
			echo '<style>.alert{margin:13px 10%;padding:5px 7px;border:1px solid #5c62a8;background-color:#dedee8;text-align:center;border-radius:5px;color:#a80707;font-weight:bold}</style>';
			echo '<div class="alert">변환중입니다...</div>';
			
			$args = va::args();
			$args->path = __DIR.'/file/zlib/';
			$args->show_sub = TRUE;
			$args->show_path = TRUE;
			$tmp_convert = dir::_list($args);
			foreach($tmp_convert as $key=>$val) 
			{
				$args = va::args();
				$args->from = $val;
				$args->to = $val.'.mp3';
				if (!zlib::unzip($args)) 
				{
					echo '<div class="msg">변환에 실패하였습니다. ('.$val.")</div>";
				}
				else
				{
					echo '변환에 성공하였습니다.';
				}
			}
		}
	}
?>