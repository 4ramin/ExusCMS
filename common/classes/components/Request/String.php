<?php

	if (!defined("__FLOWER__")) exit();

	/*get_object_vars/is_object/multipart/form-data/method_exists*/
	class str 
	{
			 //gmp_init('4211010100100010007011490', 10); // 10진수 값 
			//$num62 = gmp_strval
		public static function lower($args) 
		{
			$value = $args->from;
			return strtolower($value);
		}
		
		public static function is_json($string) 
		{
			return is_string($string) && is_array(json_decode($string, true)) && (json_last_error() == JSON_ERROR_NONE) ? true : false;
		}
		
		public static function remove_null_byte($input) 
		{
			$clean = str_replace("\x00", '', $input); 
			$clean = str_replace("\0", '', $input); 
			$clean = str_replace(chr(0), '', $input);
			
			return $clean;
		}
		
		public static function upper($args) 
		{
			$value = $args->from;
			return strtoupper($value);
		}
		
		public static function word_explode($word) 
		{
			preg_match_all('/./u', $word, $matches);
			return $matches[0];
		}
		
		public static function remove_dot($basename) 
		{
			return preg_replace("#(.*)-(.*)-(.*).(\d)-(.*)#", "$1-$2-$3$4-$5", $basename);
		}
		
		public function int_to_bytes($args) 
		{
			$length = $args->length;
			$int = $args->int;
			for($i=$length-1; $i>=0; $i--) 
			{
				$result .= chr(floor($int / pow(256, $i)));
			}
			
			return $result;
		}

		public function hex_to_bin($args) 
		{
			$source = $args->source;
			for($i=0; $i<strlen($source); $i += 2) 
			{
				$result .= chr(hexdec(substr($source, $i, 2)));
			}
			return $result;
		}
		
		public function ntrim($input) 
		{
			return str_replace("\x00", '', $input);
		}
		
		public function trim($input, $chars = '\s　') 
		{
			return mb_ereg_replace("^[$chars]+|[$chars]+$", '', $input);
		}
		
		public function nltrim($input) 
		{
			$input = preg_replace('/[\r\n]/', '', $input);
			$input = preg_replace('/\t+/', ' ', $input);
			return $input;
		}
		
		public function nlslim($input, $max = 2) 
		{
			$input = mb_ereg_replace('[\t 　]+(?=[\r\n])', '', $input);
			$replace = str_repeat('$1', $max);
			++$max;
			$regexp = '/(\r\n?|\n) {' . $max . ',}/';
			$input = preg_replace($regexp, $replace, $input);
			$input = str_replace("\t", '    ', $input);
			return $input;
		}
		
		public function nlToBr($string) 
		{
			return preg_replace('/\r\n?|\n/', '<br />', $string);
		}
		
		public function brToNl($string) 
		{
			return str_replace('<br />', "\r\n", $string);
		}
		
		public function unhtmlSpecialChars($string) 
		{
			$entity = array('&quot;', '&#039;', '&#39;', '&lt;', '&gt;', '&amp;');
			$symbol = array('"', "'", "'", '<', '>', '&');
			return str_replace($entity, $symbol, $string);
		}
		
		public function entityToTag($string, $names) 
		{
			$attr = ' ([a-z]+)=&quot;([\w!#$%()*+,\-.\/:;=?@~\[\] ]|&amp|&#039|&#39)+&quot;';
			$name_list = explode(',', $names);
			foreach ($name_list as $name) 
			{
				$string = preg_replace_callback("{&lt;($name)(($attr)*)&gt;(.*?)&lt;/$name&gt;}is", array('Utility', 'replace'), $string);
			}
			
			return $string;
		}
		
		public function replace($match) 
		{
			list($target, $name, $attr) = $match;
			$name = strToLower($name);
			$value = end($match);

			if (strpos($value, '<') !== false) 
			{
				return $target;
			}
			
			if (preg_match('/script|style|link|html|body|frame/', $name)) 
			{
				return $target;
			}
			
			if ($attr !== '') 
			{
				if (preg_match('/ on|about:|script:|@import|behaviou?r|binding|boundary|cookie|eval|expression|include-source|xmlhttp/i', $attr)) 
				{
					return $target;
				}
				
				$attr = str_replace('*/', '*/  ', $attr);
				$attr = str_replace('&quot;', '"', $attr);
				$attr = preg_replace('/ {2,}/', ' ', $attr);
				$attr = str_replace('=" ', '="', $attr);
				$attr = str_replace(' "', '"', $attr);
				$attr = preg_replace('/^ [a-z]+/ie', "strToLower('$0');", $attr);
			}
			
			return "<$name$attr>$value</$name>";
		}
		
		public function stripTags($string, $tags='') 
		{
			if ($tags === '') 
			{
				return strip_tags($string);
			}
			
			$tags = str_replace(',', '><', $tags);
			$tags = "<$tags>";
			return strip_tags($string, $tags);
		}
		
		public function uniqid($length = 20) 
		{
			$id = md5(uniqid(mt_rand(), true));
			$id = substr($id, -$length);
			return $id;
		}
		
		public function encrypt($string, $length = 32) 
		{
			return $string == '' ? '' : substr(md5($string), -$length);
		}
		
		public function cmpcrypt($raw, $pwd) 
		{
			return $raw != '' && md5($raw) === $pwd;
		}
		
		public function entrip($name, $length = 10) 
		{
			if (preg_match('/^(.+?)#(.+)$/', $name, $match)) 
			{
				list(, $name, $pass) = $match;
				$salt = substr($pass . 'H.', 1, 2);
				$salt = preg_replace('/[^\.-z]/', '.', $salt);
				$salt = strtr($salt, ':;<=>?@[\\]^_`', 'ABCDEFGabcdef');
				$trip = crypt($pass, $salt);
				$trip = substr($trip, -$length);
				$name = $name . '◆' . $trip;
			} 
			else 
			{
				$name = str_replace('◆', '◇', $name);
			}
			return $name;
		}
		
		public function autolink($string, $file = '') 
		{
			$regexp = array(
				'/[a-z\d\-_.+]+@([a-z\d\-]+\.)+[a-z]{2,7}/i',
				'/(?<!")(https?|ftp):\/\/([a-z\d\-]+\.)+[a-z]{2,7}([\w!#$%()*+,\-.\/:;=?@~\[\]]|&amp|&#039|&#39)*/'
			);
			
			$anchor = array(
				'<a href="mailto:$0">$0</a>',
				'<a href="$0">$0</a>'
			);
			
			return preg_replace($regexp, $anchor, $string);
		}
	
		public static function remove_utf8_bom($args) 
		{
			$source = $args->source;
			$source = preg_replace('/^\xEF\xBB\xBF/', '', $source);
			return $source;
		}
		
		public static function is_num($args) 
		{
			$str = $args->content;
			return is_numeric($str);
		}
		
		public static function slash_escape($args) 
		{
			$str = $args->content;
			return stripslashes($str);
		}
		
		public static function get_magic_quotes() 
		{
			return get_magic_quotes_gpc();
		}
		
		public static function is_match_strnum($args) 
		{
			return preg_match('#^[A-Za-z0-9_-]+$#', $args->source);
		}
		
		public static function round_up($args) 
		{
			$value  = $args->value;
			$places = $args->places;
			
			$mult = pow(10, abs($places)); 
			return $places < 0 ?
			ceil($value / $mult) * $mult :
			ceil($value * $mult) / $mult;
		}
		
		public static function getRandomString($length) 
		{
			$characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
			$charactersLength = strlen($characters);
			$randomString = NULL;
			
			for ($i = 0; $i < $length; $i++) 
			{
				$randomString .= $characters[rand(0, $charactersLength - 1)];
			}
			
			return $randomString;
		}
		
		public static function getUrl($args) 
		{
			
			$useRewrite = FALSE;
			$return_url = NULL;
			$rewriteParams = new stdClass;
			$func_num = func_num_args();
			$func_get = func_get_args();
			
			//rewrite
			/*if ($func_get[0]==NULL) {
				$i=1;
				while ($i < $func_num) {
					if (isset($func_get[$i+1])) {
						$rewriteParams->{$func_get[$i]} = $func_get[$i+1];
					}
					
					$i = $i+2;
				}
			} else {
				$get_tmp = $_GET;
				while ($i < $func_num) {
					if ($func_get[$i+1]=='') {
						unset($get_tmp[$func_get[$i]]);
					} else if (isset($func_get[$i+1])) {
						$get_tmp[$func_get[$i]] = $func_get[$i+1];
					}
					
					$i = $i+2;
				}
				
				if (count($get_tmp)) {
					foreach ($get_tmp as $key=>$val) {
						if ($key) {
							$rewriteParams->{$key} = $val;
						}
					}
				}
			}
			
			$base = new base();
			$act = $rewriteParams->act;
			$mid = $rewriteParams->mid;
			$srl = $rewriteParams->srl;
			$page = $rewriteParams->page;
			$target = $rewriteParams->target;
			$session = $rewriteParams->session;
			$download = $rewriteParams->download;
			$sort_index = $rewriteParams->sort_index;
			$list_count = $rewriteParams->list_count;
			
			$rewriteStr = $base->getRewriteParams($rewriteParams);
			switch($rewriteStr) {
				case "act.download.mid.session.target":
					$rewriteUrl = $act."/".$download."/".$mid."/".$session."/".$target;
					break;
				case "list_count.mid":
					$rewriteUrl = "list/".$mid."/".$list_count;
					break;
				case "mid":
					$rewriteUrl = $mid;
					break;
				case "mid.sort_index":
					$rewriteUrl = "sort/".$mid."/".$sort_index;
					break;
				case "mid.srl":
					$rewriteUrl = $mid."/".$srl;
					break;
				case "mid.page.srl":
					$rewriteUrl = $page."/".$mid."/".$srl;
					break;
				case "mid.page":
					$rewriteUrl = $page."/".$mid;
					break;
				case "act.mid":
					$rewriteUrl = $mid."/".$act;
					break;
			}
		
			if ($rewriteUrl && $useRewrite) {
				return "/".$rewriteUrl;
			}*/
			
			if ($func_get[0]==NULL) 
			{
				$i=1;
				while ($i<$func_num) 
				{
					if ($return_url) 
					{
						if (isset($func_get[$i+1])) 
						{
							$return_url .= '&'.$func_get[$i].'='.$func_get[$i+1];
						}
					} 
					else 
					{
						$return_url .= '?';
						$return_url .= $func_get[$i].'='.$func_get[$i+1];
					}
					
					$i = $i+2;
				}
			} 
			else 
			{
				$i=0;
				$get_tmp = $_GET;
				
				while ($i<$func_num) 
				{
					if ($func_get[$i+1]=='') 
					{
						unset($get_tmp[$func_get[$i]]);
					} 
					else if (isset($func_get[$i+1])) 
					{
						$get_tmp[$func_get[$i]] = $func_get[$i+1];
					}
					
					$i = $i+2;
				}
				
				foreach ($get_tmp as $key=>$val) 
				{
					if ($return_url) 
					{
						$return_url .= '&'.$key.'='.$val;
					} 
					else 
					{
						$return_url .= '?';
						$return_url .= $key.'='.$val;
					}
				}
			}
			
			$return_url = isset($_SERVER['PHP_SELF']) ? $_SERVER['PHP_SELF'].$return_url : $return_url;
			
			return $return_url;
		}
		
		public static function safe_string($data,$encoding='UTF-8') 
		{
			return htmlspecialchars($data,ENT_QUOTES | ENT_HTML401,$encoding);
		}
		
	}