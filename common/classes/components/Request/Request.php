<?php

class request
{

	public $messages = [
		100 => 'Continue',
		101 => 'Switching Protocols',
		200 => 'OK',
		201 => 'Created',
		202 => 'Accepted',
		203 => 'Non-Authoritative Information',
		204 => 'No Content',
		205 => 'Reset Content',
		206 => 'Partial Content',
		207 => 'Multi-Status',
		300 => 'Multiple Choices',
		301 => 'Moved Permanently',
		302 => 'Found',
		303 => 'See Other',
		304 => 'Not Modified',
		305 => 'Use Proxy',
		307 => 'Temporary Redirect',
		400 => 'Bad Request',
		401 => 'Unauthorized',
		402 => 'Payment Required',
		403 => 'Forbidden',
		404 => 'Not Found',
		405 => 'Method Not Allowed',
		406 => 'Not Acceptable',
		407 => 'Proxy Authentication Required',
		408 => 'Request Timeout',
		409 => 'Conflict',
		410 => 'Gone',
		411 => 'Length Required',
		412 => 'Precondition Failed',
		413 => 'Request Entity Too Large',
		414 => 'Request-URI Too Long',
		415 => 'Unsupported Media Type',
		416 => 'Requested Range Not Satisfiable',
		417 => 'Expectation Failed',
		422 => 'Unprocessable Entity',
		423 => 'Locked',
		424 => 'Failed Dependency',
		500 => 'Internal Server Error',
		501 => 'Not Implemented',
		502 => 'Bad Gateway',
		503 => 'Service Unavailable',
		504 => 'Gateway Timeout',
		505 => 'HTTP Version Not Supported',
		507 => 'Insufficient Storage',
		509 => 'Bandwidth Limit Exceeded'
	];

	function getHeaderMessage($msg) 
	{
		return $this->messages[$msg];
	}
	
	function isIIS() 
	{
		return (strpos($_SERVER['SERVER_SOFTWARE'], 'Microsoft-IIS') !== false);
	}
	
	function hasEnv($header) 
	{
		return isset($_SERVER[$header]);
	}
	
	function is32Bit() 
	{
		if (PHP_INT_MAX == 2147483647) 
		{
			return true;
		}
		
		return false;
	}
	
	function isWin() 
	{
		if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') 
		{
			return true;
		}
		
		return false;
	}
	
	function isProxy() 
	{
		$prox_host = preg_match('/anonym|cache|delegate|firewall|gateway|httpd|keeper|prox|squid|via|www/i', $_SERVER['REMOTE_HOST']);

		$prox_var =
			$this->hasEnv('HTTP_CLIENT_IP') ||
			$this->hasEnv('HTTP_FORWARDED') ||
			$this->hasEnv('HTTP_IF_MODIFIED_SINCE') ||
			$this->hasEnv('HTTP_MAX_FORWARS') ||
			$this->hasEnv('HTTP_PROXY_CONNECTION') ||
			$this->hasEnv('HTTP_SP_HOST') ||
			$this->hasEnv('HTTP_TE') ||
			$this->hasEnv('HTTP_VIA') ||
			$this->hasEnv('HTTP_X_FORWARDED_FOR') ||
			$this->hasEnv('HTTP_X_LOCKING') ||
			$this->hasEnv('HTTP_XONNECTION') ||
			$this->hasEnv('HTTP_XROXY_CONNECTION');

		return $prox_host || $prox_var;
	}

	function getincludedfiles() 
	{
		return get_included_files();
	}
	
	static function hasReferer() 
	{
		if (isset($_SERVER['HTTP_REFERER']) && isset($_SERVER['SCRIPT_URL'])) 
		{
			$ref = $_SERVER['HTTP_REFERER'];
			$url = $_SERVER['SCRIPT_URL'];
			return strpos($ref, $url) === 0;
		}
		else
		{
			return false;
		}
	}

	static function decodeBinaryNumbericPassword($input_value, $password) 
	{
		//if (2333031113100021322040444<$input_value) return false;
		$output_value = "";
		
		if (!$input_value) return NULL;
		
		$input_value = base_convert($input_value,36,10);
					
		$password = base_convert($password,32,10);
		
		$input_value = $input_value - $password;
		
		$input_value_length = strlen($input_value);
		for($i=0;$i<=$input_value_length;$i++) 
		{
			$int_val = substr($input_value,$i,1);
			
			if ($int_val > 5) 
			{
				$output_value .= str_repeat("0",$int_val-5);
			} 
			else if ($int_val) 
			{
				$output_value .= str_repeat("1",$int_val);
			}
		}

		return base_convert($output_value,2,32);
	}
	
	static function encodeBinaryNumbericPassword($input_value, $password) 
	{
		//if (200000000000<$input_value) return false;
		
		$ouput_value = base_convert($input_value,32,2);
			
		$i = 0;
		$value_bool = NULL;
		$calc_value = NULL;
		$result_value = NULL;
		
		$ouput_value_length = strlen($ouput_value);
		for($z=0;$z<=$ouput_value_length;$z++) 
		{
			$int_val = substr($ouput_value,$z,1);
			
			if ($value_bool===NULL) $value_bool = $int_val;
			
			if ($i>3 && $int_val === $value_bool) 
			{
				$result_value .= ($value_bool == 0) ? (5 + $i) : $i;
				$i = 0;
			}
			
			if ($int_val !== $value_bool) 
			{
				$result_value .= ($value_bool == 0) ? (5 + $i) : $i;
				$i = 0;
				
				$value_bool = $int_val;
			}
			
			$i++;
		}
		
		$password = base_convert($password,32,10);
		
		$result_value = $result_value + $password;
		
		$result_value = base_convert($result_value,10,36);
		
		return $result_value;
	}
	
	static function intersect($value) 
	{
		$length = floor(strlen($value) / 2);
		for($i=0; $i<$length; $i++) 
		{
			$carry = $i%2;
			if ($carry == 1) 
			{
				$temp = substr($value, $i, 1);
				$value = substr_replace($value, substr($value, strlen($value) - $i, 1), $i, 1);
				$value = substr_replace($value, $temp, strlen($value) - $i, 1);
			}
		}
		
		return $value;
	}
	
	static function str_baseconvert($str, $frombase=10, $tobase=36) 
	{
		$str = trim($str); 
		if (intval($frombase) != 10) 
		{
			$len = strlen($str); 
			$q = 0; 
			for ($i=0; $i<$len; $i++) 
			{
				$r = base_convert($str[$i], $frombase, 10); 
				$q = bcadd(bcmul($q, $frombase), $r); 
			} 
		} 
		else
		{
			$q = $str; 
		}
		
		if (intval($tobase) != 10) 
		{	
			$s = ''; 
			while (bccomp($q, '0', 0) > 0) 
			{
				$r = intval(bcmod($q, $tobase)); 
				$s = base_convert($r, 10, $tobase) . $s; 
				$q = bcdiv($q, $tobase, 0); 
			} 
		} 
		else
		{
			$s = $q; 
		}
		
		return $s; 
	} 

	static function queue($value, $mode) 
	{
		$output = NULL;
		$bool = NULL;
		$int_val = NULL;
		$i = 0;
		
		if ($mode == 'encode') 
		{
			$length = strlen($value);
			for($z=0; $z<=$length; $z++) 
			{
				$int_val = substr($value, $z, 1);
				
				if ($bool === NULL) 
				{
					$bool = $int_val;
				} 
				else if (($i>3 && $int_val === $bool) || ($int_val !== $bool)) 
				{
					$output .= ($bool == 0) ? (5 + $i) : $i;
					$i = 0;
					if ($int_val !== $bool) 
					{
						$bool = $int_val;
					}
				}
				
				$i++;
			}
		} 
		else if ($mode == 'decode') 
		{
			$length = strlen($value);
			for($i=0; $i<=$length; $i++) 
			{
				$int_val = (int)substr($value,$i,1);
				$output .= ($int_val > 5) ? str_repeat("0", $int_val-5) : str_repeat("1", $int_val);
			}
		}
		return $output;
	}
	
	static function makePrefix($value, $mode) 
	{
		if ($mode == 'encode') 
		{
			if (strlen($value) > 1 && (substr($value, 0, 1) == substr($value,strlen($value) - 1, 1))) 
			{
				$value = 0 .substr($value, 0, 1) . substr($value, 1, strlen($value) - 1);
			}
		} 
		else if ($mode == 'decode') 
		{
			if (substr($value, 0, 1) == 0) 
			{
				$carry = substr($value, 1, 1);
				$value = substr_replace(substr_replace($value, $carry, 1, 1), $carry, strlen($value) - 1, 1);
			}
		}
		
		return $value;
	}
	
	static function dictTable($str) 
	{
		$dict = str_split($str);
		sort($dict);
		$dict = implode('', $dict);
		$bool_char = false;
		$intChar = 1;
		for($i = 0;$i < strlen($dict);$i++) 
		{
			$chr = substr($dict, $i, 1);
			
			if (!is_int($chr) && $bool_char == false) 
			{
				$bool_char == true;
				$intChar = 0;
			} 
			else if (!is_int($chr) && $bool_char == true) 
			{
				
			} 
			else 
			{
				$str = str_replace($str, $chr, $intChar);
			}
			
			$intChar = $intChar + 1;
		}
	}
	
	static function encodeBinaryNumberic($value, $use_hex = false) 
	{
		if ($use_hex) 
		{
			$value = bin2hex($value);
			$value = request::str_baseconvert($value, 16, 2);
		} 
		else 
		{
			$value = request::str_baseconvert($value, 10, 2);
		}
		
		$value = request::queue($value, 'encode');
		$value = request::makePrefix($value, 'encode');
		$value = strrev($value);
		$value = request::intersect($value);
		$value = request::str_baseconvert($value, 10, 36);
		request::dictTable($value);
		return $value;
	}

	static function decodeBinaryNumberic($value, $use_hex = false) 
	{
		if (!$value) return NULL;
		
		$value = request::str_baseconvert($value, 36, 10);
		$value = request::intersect($value);
		$value = strrev($value);
		$value = request::makePrefix($value, 'decode');
		$value = request::queue($value, 'decode');
		
		if ($use_hex) 
		{
			$value = request::str_baseconvert($value, 2, 16);
			$value = hex2bin($value);
		} 
		else 
		{
			$value = request::str_baseconvert($value, 2, 10);
		}
		
		return $value;
	}
	
	function isConnectionAlive() 
	{
		$conn = $_SERVER['HTTP_CONNECTION'];
		$conn = strToLower($conn);
		return $conn === 'keep-alive';
	}
	
	public static function getmemoryusage() 
	{
		return memory_get_usage();
	}
	
	function isMatchUserAgent($agents) 
	{
		$agent = $_SERVER['HTTP_USER_AGENT'];
		$agent = preg_replace('/[\r\n]/', '', $agent);

		$regexp = preg_quote($agents, '#');
		$regexp = str_replace(',', '|', $regexp);
		$regexp = str_replace('\*', '.+', $regexp);
		return preg_match("#$regexp#", $agent);
	}

	function isMatchHost($hosts) 
	{
		$host = $_SERVER['REMOTE_HOST'];

		$regexp = preg_quote($hosts, '#');
		$regexp = str_replace(',', '|', $regexp);
		$regexp = str_replace('\*', '.+', $regexp);
		return preg_match("#$regexp#", $host);
	}

	public static function critialErr($e) 
	{
		$error_message = NULL;
		$error_message .= $e->getMessage().'(Error Code : '.$e->getCode().')';
		$error_message .= "\n\n".$e->getFile().'('.$e->getLine().')';
		$error_message .= "\nCode:\n".explode("\n",file_get_contents($e->getFile()))[$e->getLine() - 1];
		$error_message = nl2br($error_message);
		return $error_message;
	}
	
	public static function buffer($path) 
	{
		ob_start();
		if (isset($path)) 
		{
			if (file_exists($path)) 
			{
				include($path);
			} 
			else 
			{
				return;
			}
		}
		
		$include = ob_get_clean();
		
		return $include;
	}
	
	public static function encode($args) 
	{
		return base64_encode($source);
	}
	
	public static function display_err() 
	{
		error_reporting(E_ALL);
	}
	
	/**
	 * wait forever for request
	 */
	public static function wait_forever() 
	{
		set_time_limit(0);
	}
	
	public static function set_ko_env() 
	{
		putenv('LANG=ko_KR.UTF-8');
	}
	
	public static function getMicroTime() 
	{
		list($usec, $sec) = explode(" ", microtime());
		return ((float)$usec + (float)$sec);
	}

	public static function microtime() 
	{
		return microtime();
	}
	
	public function run_php($file) 
	{
		if (file_exists($file)) 
		{
			include($file);
		}
	}
	
	public static function load_php($file) 
	{
		if (file_exists($file)) 
		{
			require_once($file);
		}
	}
	
	/**
	 * check google recaptcha status
	 *
	 * @param  string  args->secret
	 * @param  string  args->captcha
	 *
	 * @return boolean
	 */
	public static function chk_recaptcha($args) 
	{
		$secret= $args->secret;
		$response = $args->captcha; //$_POST["g-recaptcha-response"];
		$verify = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret={$secret}&response={$response}");
		$captcha_success = json_decode($verify);

		if ($captcha_success->success == false) 
		{
			return false;
		}
		
		return true;
	}
	
	public static function check_min_phpver($args) 
	{
		$cur_version = $args->ver;
		$min_version = $args->req;
		return version_compare($cur_version, $min_version, '<=');
	}
	
	public static function is_crawler() 
	{
		$useragent = strtolower($_SERVER['HTTP_USER_AGENT']);
		if (preg_match("/bot|crawl|google|yahoo|slurp|spider|yeti|daum|teoma|fish|hanrss|facebook|yandex|infoseek|askjeeves|stackrambler|spyder|watchmouse|pingdom\.com|feedfetcher-google/", $useragent)) 
		{
			return true;
		}
		
		return false;
	}
	
	public static function is_mobile() 
	{
		$useragent = strtolower($_SERVER['HTTP_USER_AGENT']);
		if (preg_match('/(android|bb\d+|meego).+mobile|avantgo|pda;|htc(_|-)|bada\/|blackberry|brew|blazer|tablet|nexus|compal|teleca|minimo|lg;|wap;|elaine|eudoraweb|sonyericsson|samsung|webos\/|nintendo|nokia|fennec|hiptop|itouch|iemobile|palmos|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i',$useragent)
		||
		preg_match('/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i',substr($useragent,0,4))) 
		{
			return true;
		}
		
		return false;
	}

	public static function debug_console($args) 
	{
		
		$data = $args->data;
		$code = $args->code;
		$status = $args->status;
		
		$debug .= '<script>';
		$debug .= 'console.log('.json_encode(print_r($data, true)).');';
		$debug .= 'console.log('.json_encode(">>".$msg[$code]).');';
		$debug .= 'console.log('.json_encode(">>".$status).');';
		$debug .= 'console.log("\n");';
		$debug .= '</script>';
		echo $debug;
	}
	
	public static function set_utf8() 
	{
		ini_set('default_charset', 'UTF-8');
	}
	
	public static function show_err() 
	{
		ini_set('display_errors','On');
	}
	
	public static function set_except_handle($function) 
	{
		set_exception_handler($function);
	}
	
	public static function post_url($args) 
	{
		$url = $args->url;
		$post = $args->post;
		$curlHandle = curl_init();
		curl_setopt($curlHandle,CURLOPT_URL,$url);
		curl_setopt($curlHandle,CURLOPT_POST,1);
		curl_setopt($curlHandle,CURLOPT_POSTFIELDS,$post);
		curl_setopt($curlHandle,CURLOPT_RETURNTRANSFER,true);
		$content = curl_exec($ch);
		curl_close($curlHandle); 
		return $content;
	}
	
	public static function get_url($args) 
	{
		$url = $args->url;
		$curlHandle = curl_init();
		curl_setopt($curlHandle,CURLOPT_URL, $url);
		curl_setopt($curlHandle,CURLOPT_HEADER,0);
		curl_setopt($curlHandle,CURLOPT_RETURNTRANSFER,1);
		curl_setopt($curlHandle,CURLOPT_TIMEOUT,120); 
		$content = curl_exec($curlHandle); 
		curl_close($curlHandle); 
		return $content;
	}
	
	public static function get_host() 
	{
		$port = empty($_SERVER['HTTPS']) ? 'http://' : 'https://';
		$host = sprintf("%s%s%s", $port, $_SERVER['HTTP_HOST'], dirname($_SERVER['DOCUMENT_URI']));
		return $host;
	}
	
	public static function get_contents() 
	{
		return ob_get_contents();
	}
	
	public static function flush() 
	{
		ob_flush();
	}
	
	public static function obclean() 
	{
		while (ob_get_level()) 
		{
			ob_end_clean();
		}
	}
	
	public static function get_req_post() 
	{
		if ($_SERVER['REQUEST_METHOD'] === "POST") 
		{
			$arr = array();
			foreach ($_POST as $key=>$val) 
			{
				$arr[$key] = $val;
			}
			
			return $arr;
		}
	}
	
	public static function get_req_get() 
	{
		if ($_SERVER['REQUEST_METHOD'] === "GET") 
		{
			$arr = array();
			foreach ($_GET as $key=>$val) 
			{
				$arr[$key] = $val;
			}
			
			return $arr;
		}
	}

	public static function set_header($args) 
	{
		$code_req = $args->code;
		if ($code_req == 400) 
		{
			header::_404();
		} 
		else if ($code_req == 503) 
		{
			header::_503();
		}
	}
	
	public static function set_srl() 
	{
		$var = $args->srl;
		return serialize($var);
	}
	
	/**
	 * display xml error
	 */
	public static function xml_err($args) 
	{
		$error_message = $args->msg;
		
		if (isset($error_message)) 
		{
			echo '<?xml version="1.0" encoding="utf-8"?'.">\n";
			echo "<response>\n";
			echo "<error>1</error>\n";
			echo "<message>$error_message</message>\n";
			echo "</response>";
		} 
		else 
		{
			echo '<?xml version="1.0" encoding="utf-8"?'.">\n";
			echo "<response>\n";
			echo "<error>0</error>\n";
			echo "</response>";
		}
	}
	
	public static function unset_srl() 
	{
		$var = $args->srl;
		return unserialize($var);
	}
	
	public static function get_header() 
	{
		return $http_response_header;
	}
	
	/**
	 * get referer
	 */
	public static function get_ref() 
	{
		if (isset($_SERVER['HTTP_REFERER'])) 
		{
			return $_SERVER['HTTP_REFERER'];
		}
		
		return null;
	}
	
	public static function get_lang() 
	{
		if (isset($_SERVER['HTTP_ACCEPT_LANGUAGE'])) 
		{
			return $_SERVER['HTTP_ACCEPT_LANGUAGE'];
		}
		
		return null;
	}
	
	/**
	 * get remote ip address
	 */
	public static function get_ip() 
	{
		if (isset($_SERVER['REMOTE_ADDR'])) 
		{
			return $_SERVER['REMOTE_ADDR'];
		}
		
		return null;
	}
	
	function get_uri() 
	{
		$uri = rtrim( dirname($_SERVER["SCRIPT_NAME"]), '/' );
		$uri = '/' . trim( str_replace( $uri, '', $_SERVER['REQUEST_URI'] ), '/' );
		$uri = urldecode( $uri );
		return $uri;
	}
	
	/**
	 * get is ajax
	 */
	public static function isAjax() 
	{
		if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') 
		{
			return true;
		} 
		else 
		{
			return false;
		}
	}
	
	public static function zip_output() 
	{
		function sanitize_output($buffer) 
		{
			$search = array(
				'/\>[^\S ]+/s',  // strip whitespaces after tags, except space
				'/[^\S ]+\</s',  // strip whitespaces before tags, except space
				'/(\s)+/s',       // shorten multiple whitespace sequences
				'/[\n\r]/',
				'/\<!--.*?\-->/'
			);

			$replace = array(
				'>',
				'<',
				'\\1',
				'',
				''
			);

			$buffer = preg_replace($search, $replace, $buffer);

			return $buffer;
		}

		ob_start("sanitize_output");
	}

	public static function can_foreach ($args) 
	{
		$array = $args->array;
		if ($array instanceof \Traversable) 
		{
			return true;
		} 
		else 
		{
			return false;
		}
	}
	
	public static function get_accept_enc() 
	{
		return $_SERVER['HTTP_ACCEPT_ENCODING'];
	}
	
	public static function get_req_method() 
	{
		return $_SERVER['REQUEST_METHOD'];
	}
	
	public static function get_http_accept() 
	{
		return $_SERVER['HTTP_ACCEPT'];
	}
	
	public static function get_http_content_type() 
	{
		return $_SERVER['HTTP_CONTENT_TYPE'];
	}
	
	public static function get_protocol() 
	{
		return $_SERVER['SERVER_PROTOCOL'];
	}
	
	public static function get_content_type() 
	{
		return $_SERVER['CONTENT_TYPE'];
	}
	
	public static function get_sign() 
	{
		return $_SERVER['SERVER_SIGNATURE'];
	}
	
	public static function get_agent() 
	{
		return $_SERVER['HTTP_USER_AGENT'];
	}
	
	public static function get_root() 
	{
		return $_SERVER['DOCUMENT_ROOT'];
	}
	
}

?>