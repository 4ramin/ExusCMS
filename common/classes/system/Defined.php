<?php

	if (!defined("__FLOWER__")) exit();
	
	const DS = DIRECTORY_SEPARATOR;

	if (!empty($_SERVER['HTTP_X_ORIGINAL_URL'])) 
	{
		$_SERVER['REQUEST_URI'] = $_SERVER['HTTP_X_ORIGINAL_URL'];
	}

	if (!isset($_SERVER['REQUEST_URI']) && isset($_SERVER['SCRIPT_NAME'])) 
	{
		$_SERVER['REQUEST_URI'] = $_SERVER['SCRIPT_NAME'];
		
		if (isset($_SERVER['QUERY_STRING']) && !empty($_SERVER['QUERY_STRING'])) 
		{
			$_SERVER['REQUEST_URI'] .= '?'.$_SERVER['QUERY_STRING'];
		}
	}

	if (!isset($_SERVER['REQUEST_TIME'])) 
	{
		$_SERVER['REQUEST_TIME'] = time();
	}

	if (!isset($_SERVER['DOCUMENT_URI'])) 
	{
		$_SERVER['DOCUMENT_URI'] = null;
	}
	
	if (!isset($HTTP_RAW_POST_DATA)) 
	{
		$HTTP_RAW_POST_DATA = file_get_contents('php://input'); //XMLRPC(XML)
	}
	
	date_default_timezone_set('Asia/Seoul');
	
	//Mbstring
	ini_set('mbstring.encoding_translation', 'On');
	ini_set('mbstring.substitute_character', 'none');
	ini_set('mbstring.script_encoding', 'auto');
	
	mb_internal_encoding('UTF-8');
	mb_http_output('UTF-8');
	mb_http_input('UTF-8');
	mb_language('uni');
	mb_regex_encoding('UTF-8');

	//PHP Eror
	ini_set('display_startup_errors', 'On');
	ini_set('display_errors', 'On');
	ini_set('error_reporting', 8191);
	ini_set('log_errors', 'On');
	ini_set('error_log', __ROOT.'/_phperror.log'); 
	
	//Session
	@ini_set("url_rewriter.tags","");
	//ini_set('session.use_trans_sid', 'Off');
	ini_set('session.use_only_cookies', 'Off');
	ini_set("session.cache_expire", 180);
	ini_set("session.gc_maxlifetime", 10800);
	ini_set("session.gc_probability", 1);
	ini_set("session.gc_divisor", 100);
	session_name('flowersession');
	
	//GD
	ini_set('gd.jpeg_ignore_warning', true);
	
	//Mysql
	ini_set('magic_quotes_gpc', 'Off');
	
	defined('__APP') || define('__APP', getenv('APP_ENV'));
	defined('__MODULEID') || define('__MODULEID', 'mid');
	defined('__ACTION') || define('__ACTION', 'act');
	defined('__REQUIRETOTALDISK') || define('__REQUIRETOTALDISK', 5000);
	defined('__REQUIREFREEDISK') || define('__REQUIREFREEDISK', 500);
	defined('__HTMLZIP') || define('__HTMLZIP', true);
	defined('__SEQ') || define('__SEQ', true);
	defined('__SYSCHK') || define('__SYSCHK', false);
	defined('__MINIFY') || define('__MINIFY', false);
	defined('__SYSLANG') || define('__SYSLANG', 'ko');
	defined('__ENV') || define('__ENV', 'development');//development/production/default
	defined('__REQUIRE__') || define('__REQUIRE__', '5.5.0');
	defined('__SESSION__PROTECT') || define('__SESSION__PROTECT', true);
	defined('__XMLRPC__') || define('__XMLRPC__', false);
	defined('__DEBUG__') || define('__DEBUG__', false);
	defined('__CMS__') || define('__CMS__', true);
	defined('__SUB') || define('__SUB', strlen(dirname($_SERVER['DOCUMENT_URI'])) == 1 ? '' : dirname($_SERVER['DOCUMENT_URI']));
	defined('__ROOT_DIR') || define('__ROOT_DIR', substr(__ROOT,0,strlen(__ROOT)-strlen(__SUB)));
	defined('__COMPONENTS__') || define('__COMPONENTS__', 'base');
	defined('__SYSTEM__ATTACH') || define('__SYSTEM__ATTACH', '/file/system/');
	defined('__RESIZE__ATTACH') || define('__RESIZE__ATTACH', '/file/resize/');
	defined('__FILE__ATTACH') || define('__FILE__ATTACH', '/file/attach/');
	defined('__THUMB__ATTACH') || define('__THUMB__ATTACH', '/file/thumbnail/');
	defined('__FILE') || define('__FILE', realpath(dirname(__FILE__)).DS);
	defined('__PLUGIN') || define('__PLUGIN', __DIR."/plugin");
	defined('__COMPONENTS') || define('__COMPONENTS', __DIR."/components");
	defined('__SYS') || define('__SYS', __DIR."/modules");
	defined('__REQURL') || define('__REQURL', $_SERVER['REQUEST_URI']);
	defined('__SERVERNAME') || define('__SERVERNAME', $_SERVER['SERVER_NAME']);
	defined('__MOD') || define('__MOD', __SYS."/".__COMPONENTS__);
	
	if (defined('__SEQ') && __SEQ == true) 
	{
		if (isset($_SERVER['HTTP_CACHE_CONTROL'])) 
		{
			if ($_SERVER['HTTP_CACHE_CONTROL']==='no-cache') exit();
		}
		
		if (isset($_SERVER['HTTP_HOST']) && isset($_SERVER['SERVER_NAME'])) 
		{
			if ($_SERVER['HTTP_HOST'] !== $_SERVER['SERVER_NAME']) exit();
		}
	}
	
	if (version_compare(PHP_VERSION, __REQUIRE__, '<')) 
	{
		exit('Current PHP Version : '.PHP_VERSION . ', Required PHP Version : '.__REQUIRE__);
	}
	
	if (session_status() == PHP_SESSION_NONE) 
	{
        ini_set('session.auto_start', 'Off');
    }
	else
	{
        ini_set('session.lazy_write', 'On');
    }
	
	if (defined('__ENV')) 
	{
		switch(__ENV) 
		{
			case 'default':
				error_reporting(E_CORE_ERROR | E_CORE_WARNING | E_COMPILE_ERROR | E_ERROR | E_WARNING | E_PARSE | E_USER_ERROR | E_USER_WARNING | E_RECOVERABLE_ERROR);
				ini_set('display_errors', 1);
				
				break;
			case 'development':
				error_reporting(E_ALL);
				
				break;
			case 'production':
				error_reporting(0);
				
				break;
			case 'maximum':
				error_reporting(E_ALL);
				ini_set('display_errors', 1);
				
				break;
			case 'simple':
				error_reporting(E_ERROR | E_WARNING | E_PARSE);
				ini_set('display_errors', 1);
				
				break;
			default:
				break;
		}
	}
	
	define('__StartTime__', request::getMicroTime());
		
	if (defined(__DEBUG__)) 
	{
		define('__BaseMemory__', request::getmemoryusage());
	}
	
?>